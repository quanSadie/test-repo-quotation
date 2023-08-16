package com.example.fullCRUD.prop;

import java.util.List;

import com.example.fullCRUD.user_and_prop.UserOverride;
import com.example.fullCRUD.user_and_prop.UserOverrideRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PropertiesService {

	@Autowired
	private final PropertiesRepository propertiesRepository;

	@Autowired
	private final UserOverrideRepository userOverrideRepository;

	public List<Properties> listAll() {
		return propertiesRepository.findAll();
	}

	public List<Properties> listAllofUser(Long userId) {
		List<Properties> this_list = propertiesRepository.findAll();
		List<Object[]> list = userOverrideRepository.findPropertyAndNumberByUserId(userId);

		// Loop through the list and update this_list with numberOverride values
		for (Object[] result : list) {
			Properties properties = (Properties) result[0];
			Double numberOverride = (Double) result[1];

			// Find the corresponding Properties object in this_list
			for (Properties p : this_list) {
				if (p.getId().equals(properties.getId())) {
					p.setNumber(numberOverride);
					break;
				}
			}
		}

		return this_list;
	}

	public Properties get(long id) {
		return propertiesRepository.findById(id).get();
	}

	public Properties getOverride(long id, long userId) {
		Properties this_list =  propertiesRepository.findById(id).get();
		List<Object[]> list = userOverrideRepository.findPropertyAndNumberByUserId(userId);

		// Loop through the list and update this_list with numberOverride values
		for (Object[] result : list) {
			Properties properties = (Properties) result[0];
			Double numberOverride = (Double) result[1];

			// Find the corresponding Properties object in this_list
				if (this_list.getId().equals(properties.getId())) {
					this_list.setNumber(numberOverride);
					break;
			}
		}

		return this_list;
	}

	public void save(Properties properties) {
		propertiesRepository.save(properties);
	}

	public void delete(long id) {
		propertiesRepository.deleteById(id);
	}
}
