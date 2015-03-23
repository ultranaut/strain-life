package engapp;

import basic.MergeSort;

public class Application {

  public static void main(String[] args) {
    System.out.println("hey");

    /*
    double[] params = {3.4, 5.2, 4.567, 9.32, 0.003};
    Material material = new Material("Krypton 13", params);
    
    System.out.println(material.toString());
    */  
    
    String[] list = {"gg", "hh", "jj", "kk", "ll", "mm"};
    MergeSort sort = new MergeSort(list);
    System.out.println(sort.toString());
  }
}
