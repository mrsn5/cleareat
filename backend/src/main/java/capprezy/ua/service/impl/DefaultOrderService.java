package capprezy.ua.service.impl;

import capprezy.ua.controller.exception.model.NotValidDataException;
import capprezy.ua.model.AppUser;
import capprezy.ua.model.Order;
import capprezy.ua.model.Portion;
import capprezy.ua.repository.DishRepository;
import capprezy.ua.repository.OrderRepository;
import capprezy.ua.repository.PortionRepository;
import capprezy.ua.service.AppUserService;
import capprezy.ua.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service("orderService")
public class DefaultOrderService implements OrderService {

    @Autowired private OrderRepository orderRepository;
    @Autowired private DishRepository dishRepository;
    @Autowired private AppUserService appUserService;
    @Autowired private PortionRepository portionRepository;

    @Override
    public List<Order> getAll(Pageable pageable) {
        return orderRepository.findAll(pageable);
    }

    @Override
    public Order add(Order order) {
        AppUser user = appUserService.getCurrentUser();

        Double total = .0;
        for (Portion p: order.getPortions()) {
            Double price = p.getQuantity() * dishRepository.findByUid(p.getDish().getUid()).getPrice();
            p.setPrice(price);
            total += price;
        }
        order.setClient(user);
        order.setTotal(total);
        Order savedOrder = orderRepository.save(order);
        for (Portion p: savedOrder.getPortions()) {
            p.setOrder(savedOrder);
            portionRepository.save(p);
        }
        return savedOrder;
    }

    @Override
    public List<Order> getAll(Order.OrderStateType[] orderState, Pageable pageable) {
        if (orderState == null || orderState.length == 0) return orderRepository.findAll(pageable);
        return orderRepository.findByOrderStateIn(
                orderState == null ? new ArrayList<>() : Arrays.asList(orderState),
                pageable);
    }

    @Override
    public Order findById(Integer id) {
        return orderRepository.findByUid(id);
    }

    @Override
    public Order updateState(Order order) throws NotValidDataException {
        Order updatedOrder = orderRepository.findByUid(order.getUid());
        if (updatedOrder == null) throw NotValidDataException.createWith("Order with uid " + order.getUid() + " doesn't exsist");
        Order.OrderStateType orderState = order.getOrderState();
        if (orderState != null) {
            updatedOrder.setOrderState(order.getOrderState());
            if (orderState == Order.OrderStateType.ready) {
                updatedOrder.setReadyTime(new Timestamp(System.currentTimeMillis()));
            }

            if (orderState == Order.OrderStateType.took_away) {
                updatedOrder.setPaid(updatedOrder.getTotal());
                updatedOrder.setPaymentState(Order.PaymentStateType.fully_paid);
            }
        }

        return orderRepository.save(updatedOrder);
    }
}
