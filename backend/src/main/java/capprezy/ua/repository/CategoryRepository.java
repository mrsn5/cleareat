package capprezy.ua.repository;

import capprezy.ua.model.Category;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Integer> {
    List<Category> findByNameInIgnoreCase(String[] names);
    List<Category> findByNameNotInIgnoreCase(String[] names);
    List<Category> findByUidIn(Integer[] uids);

}
