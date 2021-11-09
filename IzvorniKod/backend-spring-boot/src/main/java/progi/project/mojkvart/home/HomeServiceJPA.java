package progi.project.mojkvart.home;

import org.springframework.beans.factory.annotation.Autowired;

public class HomeServiceJPA implements HomeService{
    @Autowired
    private HomeRepository homeRepo;
}
