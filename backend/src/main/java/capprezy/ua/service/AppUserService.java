package capprezy.ua.service;

import capprezy.ua.controller.exception.AlreadyExistsException;
import capprezy.ua.model.AppUser;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface AppUserService extends UserDetailsService {
    void register(AppUser appUser) throws AlreadyExistsException;
    AppUser findById(Integer id);
    AppUser findByMail(String mail);
    User loadUserByUsername(String username);
}
