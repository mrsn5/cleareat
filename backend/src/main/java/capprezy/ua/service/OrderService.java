package capprezy.ua.service;

import capprezy.ua.controller.exception.model.AlreadyExistsException;
import capprezy.ua.model.Category;
import capprezy.ua.model.Order;

import org.springframework.data.domain.Pageable;
import java.util.List;

public interface OrderService {
    List<Order> getAll(Pageable pageable);
    Order add(Order order);

    List<Order> getAll(Order.OrderStateType[] orderState, Pageable pageable);

    Order findById(Integer id);
}
