package capprezy.ua.service.impl;

import capprezy.ua.model.Ingredient;
import capprezy.ua.repository.IngredientRepository;
import capprezy.ua.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("ingredientService")
public class DefaultIngredientService implements IngredientService {

    @Autowired
    private IngredientRepository ingredientRepository;

    @Override
    public List<Ingredient> getAll() {
        return ingredientRepository.findAll();
    }
}
