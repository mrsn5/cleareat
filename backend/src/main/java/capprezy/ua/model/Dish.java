package capprezy.ua.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Collection;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity(name = "_dish")
public class Dish {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer uid;
    private String name;
    private Double weight;
    private Double price;
    private Integer calories;
    private Boolean isAvailable;
    private String photo;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "_dish_category",
        joinColumns = @JoinColumn(name = "dish_uid"),
        inverseJoinColumns = @JoinColumn(name = "category_uid"))
    private Collection<Category> categories;

    @OneToMany(mappedBy = "dishUid", fetch = FetchType.LAZY)
    private Collection<DishIngredient> dishIngredients;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "_dish_ingredient",
            joinColumns = @JoinColumn(name = "dishUid"),
            inverseJoinColumns = @JoinColumn(name = "ingredientUid"))
    private Collection<Ingredient> ingredients;

}
