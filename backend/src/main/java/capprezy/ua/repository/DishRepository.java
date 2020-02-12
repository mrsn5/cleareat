package capprezy.ua.repository;

import capprezy.ua.model.Category;
import capprezy.ua.model.Dish;
import capprezy.ua.model.Ingredient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface DishRepository extends CrudRepository<Dish, Integer> {
    List<Dish> findAll(Pageable pageable);

    List<Dish> findByCategoriesIn(Iterable<Category> categories, Pageable pageable);
    List<Dish> findByCategoriesNotIn(Iterable<Category> categories, Pageable pageable);
    List<Dish> findByIngredientsIn(Iterable<Ingredient> ingredients, Pageable pageable);
    List<Dish> findByIngredientsNotIn(Iterable<Ingredient> ingredients, Pageable pageable);

    @Query(value = "select * from caprezzy._dish d\n" +
            "where ((?1) is null or d.uid in (select dc.dish_uid from caprezzy._dish_category dc " +
            "                where dc.category_uid in (select c.uid from caprezzy._category c where c.name in (?1)))) " +
            "  and ((?2) is null or d.uid not in (select dc.dish_uid from caprezzy._dish_category dc " +
            "                                 where dc.category_uid in (select c.uid from caprezzy._category c where c.name in (?2)))) " +
            "  and ((?3) is null or d.uid in (select di.dish_uid from caprezzy._dish_ingredient di " +
            "    where di.ingredient_uid in (select i.uid from caprezzy._ingredient i where i.name in (?3)))) " +
            "  and ((?4) is null or d.uid not in (select di.dish_uid from caprezzy._dish_ingredient di " +
            "                                 where di.ingredient_uid in (select i.uid from caprezzy._ingredient i where i.name in (?4)))) ",
            nativeQuery = true)
    List<Dish> findByCriteria(List<String> categoriesIn,
                              List<String> categoriesNotIn,
                              List<String> ingredientsIn,
                              List<String> ingredientsNotIn,
                              Pageable pageable);



//    @Query("select d from _dish d where d.movie = :movie")
//    List<Dish> findBySorted(
//            @Param("name") String name, Sort sort);
}
