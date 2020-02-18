package capprezy.ua.service.impl;

import capprezy.ua.controller.exception.model.AlreadyExistsException;
import capprezy.ua.model.AppUser;
import capprezy.ua.model.Category;
import capprezy.ua.model.Order;
import capprezy.ua.model.Portion;
import capprezy.ua.repository.CategoryRepository;
import capprezy.ua.repository.DishRepository;
import capprezy.ua.repository.OrderRepository;
import capprezy.ua.repository.PortionRepository;
import capprezy.ua.service.AppUserService;
import capprezy.ua.service.CategoryService;
import capprezy.ua.service.DishService;
import capprezy.ua.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sound.sampled.Port;
import java.util.List;

@Service("orderService")
public class DefaultOrderService implements OrderService {

    @Autowired private OrderRepository orderRepository;
    @Autowired private DishRepository dishRepository;
    @Autowired private AppUserService appUserService;
    @Autowired private PortionRepository portionRepository;

    @Override
    public List<Order> getAll() {
        return orderRepository.findAll();
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
}
