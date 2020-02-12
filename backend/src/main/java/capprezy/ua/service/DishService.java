package capprezy.ua.service;

import capprezy.ua.model.Dish;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DishService {
    List<Dish> findAll(Pageable pageable);

    List<Dish> findByCriteria(String[] categoriesIn,
                                  String[] categoriesNotIn,
                                  String[] ingredientsIn,
                                  String[] ingredientsNotIn,
                                  Pageable pageable);

}
