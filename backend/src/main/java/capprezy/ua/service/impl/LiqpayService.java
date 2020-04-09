package capprezy.ua.service.impl;

import capprezy.ua.controller.exception.model.NotValidDataException;
import capprezy.ua.model.Order;
import capprezy.ua.model.Payment;
import capprezy.ua.repository.OrderRepository;
import capprezy.ua.service.OrderService;
import com.liqpay.LiqPay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service("liqpayService")
public class LiqpayService {

    private static String PUBLIC_KEY = "sandbox_i58370747507";
    private static String PRIVATE_KEY = "sandbox_El4JmmuwDjLTWFARwkZqUsxgJB27padgUwabv2pw";


    @Autowired private OrderService orderService;
    @Autowired private OrderRepository orderRepository;

    public String preparePayOrder(Integer id) throws NotValidDataException {
        Order order = orderService.findById(id);
        if (order == null) throw NotValidDataException.createWith("No such order");

        String paymentId = UUID.randomUUID().toString();
        Map params = new HashMap();
        params.put("amount", order.getTotal());
        params.put("currency", "UAH");
        params.put("action", "pay");
        params.put("description", "Замовлення №" + id);
        params.put("order_id", paymentId);
        params.put("sandbox", "1"); // enable the testing environment and card will NOT charged. If not set will be used property isCnbSandbox()

        order.setPaymentId(paymentId);
        orderRepository.save(order);
        LiqPay liqpay = new LiqPay(PUBLIC_KEY, PRIVATE_KEY);
        return liqpay.cnb_form(params);
    }

    public void checkPayment(Payment payment) throws NotValidDataException {
        if (payment.getStatus().equals("success")) {
            Order order = orderRepository.findByPaymentId(payment.getOrderId());
            if (order == null) throw NotValidDataException.createWith("No such order");

            order.setPaid(order.getPaid() + payment.getAmount());
            if (order.getPaid() >= order.getTotal()) order.setPaymentState(Order.PaymentStateType.fully_paid);
            else order.setPaymentState(Order.PaymentStateType.part_paid);
        }
    }
}
