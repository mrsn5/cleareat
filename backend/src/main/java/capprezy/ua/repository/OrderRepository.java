package capprezy.ua.repository;

import capprezy.ua.model.Ingredient;
import capprezy.ua.model.Order;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;
import java.util.List;

@Repository
public interface OrderRepository extends CrudRepository<Order, Integer> {
    List<Order> findAll(Pageable pageable);
    Order findByUid(Integer id);

//    @Query(value = "select * from caprezzy._order o " +
//            "where ((?1) is null or o.order_state in (?1)) ",
//            nativeQuery = true)
    List<Order> findByOrderStateIn(List<Order.OrderStateType> orderState, Pageable pageable);
}
