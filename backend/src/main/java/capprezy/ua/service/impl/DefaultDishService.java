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

import java.util.List;


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
    public List<Dish> findByCriteria(String[] categoriesIn, String[] categoriesNotIn, String[] ingredientsIn, String[] ingredientsNotIn, Pageable pageable) {

//        List<Category> cin = categoryRepository.findByNameInIgnoreCase(categoriesIn);
//        List<Category> cnin = categoryRepository.findByNameNotInIgnoreCase(categoriesNotIn);
        List<Ingredient> iin = ingredientRepository.findByNameInIgnoreCase(ingredientsIn);
        return dishRepository.findByIngredientsIn(iin, pageable);
    }

}
