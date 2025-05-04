# student_grades.py

mahasiswa = [
    {"nama": "Andi", "nim": "22001", "nilai_uts": 80, "nilai_uas": 85, "nilai_tugas": 75},
    {"nama": "Budi", "nim": "22002", "nilai_uts": 65, "nilai_uas": 70, "nilai_tugas": 60},
    {"nama": "Citra", "nim": "22003", "nilai_uts": 90, "nilai_uas": 95, "nilai_tugas": 90},
    {"nama": "Dina", "nim": "22004", "nilai_uts": 50, "nilai_uas": 55, "nilai_tugas": 45},
    {"nama": "Eko", "nim": "22005", "nilai_uts": 70, "nilai_uas": 60, "nilai_tugas": 65}
]

# Hitung nilai akhir dan tentukan grade
for mhs in mahasiswa:
    nilai_akhir = (0.3 * mhs["nilai_uts"]) + (0.4 * mhs["nilai_uas"]) + (0.3 * mhs["nilai_tugas"])
    mhs["nilai_akhir"] = round(nilai_akhir, 2)

    if nilai_akhir >= 80:
        grade = "A"
    elif nilai_akhir >= 70:
        grade = "B"
    elif nilai_akhir >= 60:
        grade = "C"
    elif nilai_akhir >= 50:
        grade = "D"
    else:
        grade = "E"
    
    mhs["grade"] = grade

# Tampilkan data tabel
print("\nData Mahasiswa:")
print("{:<10} {:<8} {:<6} {:<6} {:<6} {:<10} {:<6}".format(
    "Nama", "NIM", "UTS", "UAS", "Tugas", "Nilai Akhir", "Grade"))
for mhs in mahasiswa:
    print("{:<10} {:<8} {:<6} {:<6} {:<6} {:<10} {:<6}".format(
        mhs["nama"], mhs["nim"], mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"], mhs["nilai_akhir"], mhs["grade"]))

# Mahasiswa dengan nilai tertinggi dan terendah
tertinggi = max(mahasiswa, key=lambda x: x["nilai_akhir"])
terendah = min(mahasiswa, key=lambda x: x["nilai_akhir"])

print(f"\nMahasiswa dengan nilai tertinggi: {tertinggi['nama']} ({tertinggi['nilai_akhir']})")
print(f"Mahasiswa dengan nilai terendah: {terendah['nama']} ({terendah['nilai_akhir']})")
