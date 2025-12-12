package vishdev.ContactManager.repository;
import vishdev.ContactManager.models.deletedContacts;

import org.springframework.data.jpa.repository.JpaRepository;

public interface deletedContactsRepository extends JpaRepository<deletedContacts,Long> {
}
