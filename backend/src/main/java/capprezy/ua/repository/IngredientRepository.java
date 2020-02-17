package capprezy.ua.repository;

import capprezy.ua.model.Category;
import capprezy.ua.model.Ingredient;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngredientRepository extends CrudRepository<Ingredient, Integer> {
    List<Ingredient> findAll();
    List<Ingredient> findByUidIn(Integer[] uids);
}
