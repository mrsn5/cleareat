package capprezy.ua.service;

import capprezy.ua.controller.exception.model.AlreadyExistsException;
import capprezy.ua.model.Dish;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DishService {
    List<Dish> findAll(Pageable pageable);
    Dish add(Dish dish) throws AlreadyExistsException;
    List<Dish> findByCriteria(Integer[] categoriesIn,
                              Integer[] categoriesNotIn,
                              Integer[] ingredientsIn,
                              Integer[] ingredientsNotIn,
                                  Pageable pageable);

}
