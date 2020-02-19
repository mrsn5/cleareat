package capprezy.ua.repository;

import capprezy.ua.model.Category;
import capprezy.ua.model.DishIngredient;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DishIngredientRepository extends CrudRepository<DishIngredient, Integer> {
}
