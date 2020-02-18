package capprezy.ua.controller;

import capprezy.ua.controller.exception.model.AlreadyExistsException;
import capprezy.ua.model.Category;
import capprezy.ua.model.Order;
import capprezy.ua.repository.PortionRepository;
import capprezy.ua.service.CategoryService;
import capprezy.ua.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity getAll(){
        return ResponseEntity.ok(orderService.getAll());
    }

    @PostMapping
    public ResponseEntity add(@RequestBody @Valid Order order) throws AlreadyExistsException {

        return ResponseEntity.ok(orderService.add(order));
    }
}
