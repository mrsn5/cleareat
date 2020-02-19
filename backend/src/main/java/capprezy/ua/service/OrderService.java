package capprezy.ua.service;

import capprezy.ua.controller.exception.model.AlreadyExistsException;
import capprezy.ua.model.Category;
import capprezy.ua.model.Order;

import java.util.List;

public interface OrderService {
    List<Order> getAll();
    Order add(Order order);
}
