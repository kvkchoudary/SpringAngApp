package com.krishna.web;
import java.util.ArrayList;   
import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;   
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;   
import org.springframework.web.bind.annotation.RequestMethod;   
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;   

import com.krishna.model.Country;
import com.krishna.model.MyCls;
  
@RestController  
public class SpringRestController {   
    
 @RequestMapping(value = "/countries", method = RequestMethod.GET,headers="Accept=application/json")   
 public List<Country> getCountries()   
 {   
  List<Country> listOfCountries = new ArrayList<Country>();   
  listOfCountries=createCountryList();   
  return listOfCountries;   
 }   
  
 @RequestMapping(value = "/country/{id}", method = RequestMethod.GET,headers="Accept=application/json")   
 public Country getCountryById(@PathVariable int id)   
 {   
  List<Country> listOfCountries = new ArrayList<Country>();   
  listOfCountries=createCountryList();     
  for (Country country: listOfCountries) {   
   if(country.getId()==id)   
    return country;   
  }   
  return null;   
 }   
  
 
 @RequestMapping(value = "/create", method = RequestMethod.POST, consumes="application/json", produces="text/plain")
 @ResponseStatus()
  public @ResponseBody String createChangeRequest(@RequestBody MyCls mycls) {
   return "YAHOOOO!!"; 
  }
 
 
 
// Utiliy method to create country list.   
 public List<Country> createCountryList()   
 {   
  Country indiaCountry=new Country(1, "India");   
  Country chinaCountry=new Country(4, "China");   
  Country nepalCountry=new Country(3, "Nepal");   
  Country bhutanCountry=new Country(2, "Bhutan");   
  
  List<Country> listOfCountries = new ArrayList<Country>();   
  listOfCountries.add(indiaCountry);   
  listOfCountries.add(chinaCountry);   
  listOfCountries.add(nepalCountry);   
  listOfCountries.add(bhutanCountry);   
  return listOfCountries;   
 }   
}  

