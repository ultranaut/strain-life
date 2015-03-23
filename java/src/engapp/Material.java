package engapp;

import java.util.Formatter;

public class Material {
  private String label;
  private double sigma_subf_prime;
  private double b;
  private double epsilon_subf_prime;
  private double c;
  private double Epsilon;

  public Material(String label, double[] data) {
    this.label = label;
    this.sigma_subf_prime = data[0];
    this.b = data[1];
    this.epsilon_subf_prime = data[2];
    this.c = data[3];
    this.Epsilon = data[4];
  }

  public String getLabel() {
    return label;
  }

  public void setLabel(String label) {
    this.label = label;
  }

  public double getSigma_subf_prime() {
    return sigma_subf_prime;
  }

  public void setSigma_subf_prime(double sigma_subf_prime) {
    this.sigma_subf_prime = sigma_subf_prime;
  }

  public double getB() {
    return b;
  }

  public void setB(double b) {
    this.b = b;
  }

  public double getEpsilon_subf_prime() {
    return epsilon_subf_prime;
  }

  public void setEpsilon_subf_prime(double epsilon_subf_prime) {
    this.epsilon_subf_prime = epsilon_subf_prime;
  }

  public double getC() {
    return c;
  }

  public void setC(double c) {
    this.c = c;
  }

  public double getEpsilon() {
    return Epsilon;
  }

  public void setEpsilon(double epsilon) {
    Epsilon = epsilon;
  }
  
  public String toString() {
    Formatter sb = new Formatter();
    sb.format("%-25s %7s\n", "Material:", this.label);
    sb.format("%-25s %7.5f\n", "Strength coefficient:", this.sigma_subf_prime);
    sb.format("%-25s %7.5f\n", "Strength exponent:", this.b);
    sb.format("%-25s %7.5f\n", "Ductility coefficient:", this.epsilon_subf_prime);
    sb.format("%-25s %7.5f\n", "Ductility exponent:", this.c);
    sb.format("%-25s %7.5f\n", "Epsilon:", this.sigma_subf_prime);

    return sb.toString();
  }
  
}
