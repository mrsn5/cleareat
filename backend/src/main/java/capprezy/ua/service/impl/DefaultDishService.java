package capprezy.ua.service.impl;

import capprezy.ua.controller.exception.model.AlreadyExistsException;
import capprezy.ua.model.Category;
import capprezy.ua.model.Dish;
import capprezy.ua.model.DishIngredient;
import capprezy.ua.model.Ingredient;
import capprezy.ua.repository.CategoryRepository;
import capprezy.ua.repository.DishIngredientRepository;
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

    @Autowired
    private DishRepository dishRepository;
    @Autowired
    private DishIngredientRepository dishIngredientRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private IngredientRepository ingredientRepository;


    @Override
    public List<Dish> findAll(Pageable pageable) {
        return dishRepository.findAll(pageable);
    }

    @Override
    public Dish add(Dish dish) throws AlreadyExistsException {
        Dish d = dishRepository.findByNameIgnoreCase(dish.getName());
        if (d == null) {
            Dish createdDish = dishRepository.save(dish);
            List<DishIngredient> dis = dish.getDishIngredients();
            for (DishIngredient di: dis) {
                di.setDish(createdDish);
                di.getId().setDishUid(createdDish.getUid());
            }
            dishIngredientRepository.saveAll(dis);
            return createdDish;
        } else {
            throw AlreadyExistsException.createWith("This dish is already existed: " + d.getName());
        }
    }

    @Override
    public List<Dish> findByCriteria(Integer[] categoryIn, Integer[] categoryNotIn, Integer[] ingredientIn, Integer[] ingredientNotIn, Pageable pageable) {
        return dishRepository.findByCriteria(
                categoryIn == null ? new ArrayList<>() : Arrays.asList(categoryIn),
                categoryNotIn == null ? new ArrayList<>() : Arrays.asList(categoryNotIn),
                ingredientIn == null ? new ArrayList<>() : Arrays.asList(ingredientIn),
                ingredientNotIn == null ? new ArrayList<>() : Arrays.asList(ingredientNotIn),
                pageable);
    }

}
