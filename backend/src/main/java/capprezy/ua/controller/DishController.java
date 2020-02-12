package capprezy.ua.controller;

import capprezy.ua.model.Dish;
import capprezy.ua.repository.DishRepository;
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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@RestController
@RequestMapping("api/dish")
public class DishController {

    @Autowired
    private DishService dishService;

    @Autowired
    private DishRepository dishRepository;

    @GetMapping
    public ResponseEntity<List<Dish>> loadDishesPage(
            @PageableDefault(page = 0, size = 20)
            @SortDefault.SortDefaults({@SortDefault(sort = "name", direction = Sort.Direction.ASC)})
                    Pageable pageable,
            String[] categoryIn,
            String[] categoryNotIn,
            String[] ingredientIn,
            String[] ingredientNotIn
    ) {
        List res = dishRepository.findByCriteria(
                categoryIn == null      ? new ArrayList<>() : Arrays.asList(categoryIn),
                categoryNotIn == null   ? new ArrayList<>() : Arrays.asList(categoryNotIn),
                ingredientIn == null    ? new ArrayList<>() : Arrays.asList(ingredientIn),
                ingredientNotIn == null ? new ArrayList<>() : Arrays.asList(ingredientNotIn),
                pageable);
        return ResponseEntity.ok(res);
    }
}
