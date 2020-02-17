package capprezy.ua.service.impl;

import capprezy.ua.model.Category;
import capprezy.ua.model.Dish;
import capprezy.ua.model.Ingredient;
import capprezy.ua.repository.CategoryRepository;
import capprezy.ua.repository.DishRepository;
import capprezy.ua.repository.IngredientRepository;
import capprezy.ua.service.DishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Service("dishService")
public class DefaultDishService implements DishService {

    @Autowired private DishRepository dishRepository;
    @Autowired private CategoryRepository categoryRepository;
    @Autowired private IngredientRepository ingredientRepository;


    @Override
    public List<Dish> findAll(Pageable pageable) {
        return dishRepository.findAll(pageable);
    }

    @Override
    public List<Dish> findByCriteria(Integer[] categoryIn, Integer[] categoryNotIn, Integer[] ingredientIn, Integer[] ingredientNotIn, Pageable pageable) {
        return dishRepository.findByCriteria(
                categoryIn == null      ? new ArrayList<>() : Arrays.asList(categoryIn),
                categoryNotIn == null   ? new ArrayList<>() : Arrays.asList(categoryNotIn),
                ingredientIn == null    ? new ArrayList<>() : Arrays.asList(ingredientIn),
                ingredientNotIn == null ? new ArrayList<>() : Arrays.asList(ingredientNotIn),
                pageable);
    }

}
