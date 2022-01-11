package progi.project.mojkvart.street;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import progi.project.mojkvart.account.Account;
import progi.project.mojkvart.account.AccountRepository;
import progi.project.mojkvart.account.AccountService;
import progi.project.mojkvart.district.District;
import progi.project.mojkvart.district.DistrictRepository;
import progi.project.mojkvart.home.Home;
import progi.project.mojkvart.role_request.RoleRequest;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StreetServiceJPA implements StreetService{
    @Autowired
    private StreetRepository streetRepo;
    @Autowired
    private DistrictRepository districtRepo;
    @Autowired
    private AccountService accountService;
    @Autowired
    private AccountRepository accountRepository;

    public StreetServiceJPA(DistrictRepository districtRepo) {
        this.districtRepo = districtRepo;
    }

    @Override
    public List<Street> listAll() {
        return streetRepo.findByOrderById();
    }

    @Override
    public Optional<Street> findById(long streetId) {
        Assert.notNull(streetId, "ID must be given");
        return streetRepo.findById(streetId);
    }

    @Override
    public boolean existsById(long id) {
        return findById(id).isPresent();
    }

    @Override
    public boolean districtExistsById(long id) {
        return districtRepo.existsById(id);
    }

    @Override
    public Street fetch(long streetId) {
        return findById(streetId).orElseThrow(
                () -> new IllegalArgumentException()
        );
    };

    @Override
    public Street updateStreet(Street street) {
        Long streetId = street.getId();
        return streetRepo.save(street);
    }

    @Override
    public Street deleteStreet(long streetId) {
        Street street = fetch(streetId);
        List<Home> homes = street.getHomes();
        List<Account> accounts = homes.stream().flatMap(home -> home.getAccounts().stream()).collect(Collectors.toList());
        for(Account account: accounts) {
            account.setHome(accountService.generateDummyHome());
            account.setAddressValid(false);
            System.out.println("account: "+ account);
        }
        accountRepository.saveAll(accounts);
        streetRepo.delete(street);
        return street;
    }

    @Override
    public Street createStreet(Street street) {
        Assert.isNull(street.getId(),
                "Street ID must be null, not: " + street.getId()
        );
        long maxId = streetRepo.getMaxId();
        street.setId(maxId == -1 ? 1 : maxId + 1);
        return streetRepo.save(street);
    }

    @Override
    public Optional<Street> findByName(String name) {
        Assert.notNull(name, "Street name must be given");
        return streetRepo.findByName(name);
    }
}
