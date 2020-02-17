package capprezy.ua.controller;

import capprezy.ua.service.DishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
            Integer[] ingredientNotIn
    ) {
        List res = dishService.findByCriteria(categoryIn, categoryNotIn, ingredientIn, ingredientNotIn, pageable);
        return ResponseEntity.ok(res);
    }
}
