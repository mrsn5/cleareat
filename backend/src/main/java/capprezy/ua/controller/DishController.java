package capprezy.ua.controller;

import capprezy.ua.controller.exception.model.AlreadyExistsException;
import capprezy.ua.model.Category;
import capprezy.ua.model.Dish;
import capprezy.ua.service.DishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("api/dish")
public class DishController {

    @Autowired
    private DishService dishService;

    @GetMapping
    public ResponseEntity loadDishesPage(
            @PageableDefault(page = 0, size = 20)
            @SortDefault.SortDefaults({@SortDefault(sort = "name", direction = Sort.Direction.ASC)})
                    Pageable pageable,
            Integer[] categoryIn,
            Integer[] categoryNotIn,
            Integer[] ingredientIn,
            Integer[] ingredientNotIn,
            Double maxPrice,
            String like
    ) {
        List res = dishService.findByCriteria(categoryIn, categoryNotIn, ingredientIn, ingredientNotIn, maxPrice, like, pageable);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/{id}")
    public ResponseEntity getById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(dishService.findById(id));
    }

    @PostMapping
    public ResponseEntity add(@RequestBody @Valid Dish dish) throws AlreadyExistsException {
        return ResponseEntity.ok(dishService.add(dish));
    }
}
