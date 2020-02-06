package capprezy.ua.service;


import capprezy.ua.controller.exception.AlreadyExistsException;
import capprezy.ua.model.AppUser;
import capprezy.ua.repository.UserRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service("userService")
public class DefaultUserService implements AppUserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void register(AppUser appUser) throws AlreadyExistsException {
        Optional<AppUser> _user = userRepository.findByMail(appUser.getMail());
        Optional<AppUser> _user2 = userRepository.findByPhone(appUser.getPhone());
        if (_user.isEmpty() && _user2.isEmpty()) {
            appUser.setPassword(passwordEncoder.encode(appUser.getPassword())); //todo hash
            userRepository.save(appUser);
        } else if (_user.isPresent()) {
            throw AlreadyExistsException.createWith("This mail is already in system");
        } else if (_user2.isPresent()) {
            throw AlreadyExistsException.createWith("This phone is already in system");
        }
    }

    @Override
    public User loadUserByUsername(String username) {
        Optional<AppUser> _appUser = userRepository.findByMail(username);
        if(_appUser.isPresent()){
            AppUser appUser = _appUser.get();
            return new User(appUser.getMail(), appUser.getPassword(), true, true, true, true,
                    AuthorityUtils.createAuthorityList("USER"));
        }
        return null;
    }

    public AppUser findById(Integer id) {
        Optional<AppUser> customer= userRepository.findById(id);
        return customer.orElse(null);
    }

    @Override
    public AppUser findByMail(String mail) {
        Optional<AppUser> customer= userRepository.findByMail(mail);
        return customer.orElse(null);
    }
}
