package capprezy.ua.controller;

import capprezy.ua.controller.exception.model.AlreadyExistsException;
import capprezy.ua.controller.exception.model.NotValidDataException;
import capprezy.ua.model.Order;
import capprezy.ua.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity getAll(
            @PageableDefault(page = 0, size = 20)
            @SortDefault.SortDefaults({@SortDefault(sort = "orderTime", direction = Sort.Direction.DESC)})
                    Pageable pageable,
            Order.OrderStateType[] orderStates
    ){
        return ResponseEntity.ok(orderService.getAll(orderStates, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity getById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(orderService.findById(id));
    }

    @PostMapping
    public ResponseEntity add(@RequestBody @Valid Order order) throws AlreadyExistsException {
        return ResponseEntity.ok(orderService.add(order));
    }

    @PutMapping
    public ResponseEntity update(@RequestBody Order order) throws NotValidDataException {
        return ResponseEntity.ok(orderService.updateState(order));
    }
}
