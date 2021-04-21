package com.project.products.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.products.models.PricesHistory;
import com.project.products.models.Product;

public interface PricesHistoryRepository extends JpaRepository<PricesHistory,Long>{

	//List<PricesHistory> findAllByProduct(Product produit);

	//List<PricesHistory> findAllByOrderByDatechangementAsc();

	List<PricesHistory> findAllByOrderByProductAsc();

	//List<PricesHistory> findAllByProductOrderByDatechangementAsc(Product produit);

	List<PricesHistory> findAllByProductOrderByDatechangementDesc(Product produit);

	//List<PricesHistory> findTopByProductOrderByDatechangementAsc(Product produit);

	//List<PricesHistory> findTop1ByProductOrderByDatechangementAsc(Product produit);
  

}
