# main.py

# Import seluruh modul
import math_operation as mo
# Import sebagian fungsi
from math_operation import celsius_ke_fahrenheit, celsius_ke_kelvin

# Geometri
print("=== Hitung Luas dan Keliling ===")
print(f"Luas Persegi (sisi 4): {mo.luas_persegi(4)}")
print(f"Keliling Persegi: {mo.keliling_persegi(4)}")
print(f"Luas Persegi Panjang (5x3): {mo.luas_persegi_panjang(5, 3)}")
print(f"Keliling Persegi Panjang: {mo.keliling_persegi_panjang(5, 3)}")
print(f"Luas Lingkaran (r=7): {mo.luas_lingkaran(7):.2f}")
print(f"Keliling Lingkaran: {mo.keliling_lingkaran(7):.2f}")

# Suhu
print("\n=== Konversi Suhu ===")
print(f"30°C ke Fahrenheit: {celsius_ke_fahrenheit(30):.2f}°F")
print(f"30°C ke Kelvin: {celsius_ke_kelvin(30):.2f}K")
