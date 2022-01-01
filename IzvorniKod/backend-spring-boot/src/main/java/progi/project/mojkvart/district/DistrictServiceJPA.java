package progi.project.mojkvart.district;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import progi.project.mojkvart.account.Account;
import progi.project.mojkvart.account.AccountRepository;
import progi.project.mojkvart.account.AccountService;
import progi.project.mojkvart.home.Home;
import progi.project.mojkvart.home.HomeRepository;
import progi.project.mojkvart.street.Street;
import progi.project.mojkvart.street.StreetRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DistrictServiceJPA implements DistrictService{

    @Autowired
    private DistrictRepository districtrepo;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private StreetRepository streetRepository;

    @Autowired
    private HomeRepository homeRepository;

    @Autowired
    private AccountService accountService;

    @Override
    public List<District> listAll() {
        return districtrepo.findByOrderById();
    }

    @Override
    public District fetch(long districtId) {
        return findById(districtId).orElseThrow(
                () -> new IllegalArgumentException()
        );
    }

    @Override
    public Optional<District> findById(long districtId) {
        Assert.notNull(districtId, "ID must be given");
        return districtrepo.findById(districtId);
    }

    @Override
    public District createDistrict(District district) {
        Assert.isNull(district.getId(), "District ID must be null, not: " + district.getId());
        return districtrepo.save(district);
    }

    @Override
    public District updateDistrict(District district) {
        return districtrepo.save(district);
    }

    @Override
    public District deleteDistrict(long districtid) {
        District district = fetch(districtid);
        List<Street> streets = district.getStreets();
        System.out.println("streets: "+ streets);
        List<Home> homes = streets.stream().flatMap(street -> street.getHomes().stream()).collect(Collectors.toList());
        System.out.println("homes: "+ homes);
        List<Account> accounts = homes.stream().flatMap(home -> home.getAccounts().stream()).collect(Collectors.toList());
        System.out.println("accounts: "+ accounts);
        for(Account account: accounts) {
            account.setHome(accountService.generateDummyHome());
            System.out.println("account: "+ account);
        }
        accountRepository.saveAll(accounts);
        districtrepo.delete(district);
        return district;
    }

    @Override
    public boolean existsById(long id) {
        return findById(id).isPresent();
    }

    @Override
    public Optional<District> findByName(String name) {
        Assert.notNull(name, "Name must be given");
        return districtrepo.findByName(name);
    }

}
