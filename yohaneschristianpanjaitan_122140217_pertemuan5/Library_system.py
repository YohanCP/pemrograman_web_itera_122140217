from abc import ABC, abstractmethod

# Abstract class untuk item perpustakaan
class LibraryItem(ABC):
    def __init__(self, item_id, title):
        self._item_id = item_id  # protected
        self.__title = title     # private (encapsulation)

    # Property untuk akses aman ke title
    @property
    def title(self):
        return self.__title

    @abstractmethod
    def display_info(self):
        """
        Method abstrak yang harus diimplementasikan oleh semua subclass.
        """
        pass


# Subclass Book mewarisi LibraryItem
class Book(LibraryItem):
    """
    Kelas Book merepresentasikan buku dalam perpustakaan.
    """
    def __init__(self, item_id, title, author):
        super().__init__(item_id, title)
        self.author = author

    def display_info(self):
        """
        Implementasi method abstract untuk menampilkan info buku.
        """
        print(f"[Book] ID: {self._item_id}, Title: {self.title}, Author: {self.author}")


# Subclass Magazine mewarisi LibraryItem
class Magazine(LibraryItem):
    """
    Kelas Magazine merepresentasikan majalah dalam perpustakaan.
    """
    def __init__(self, item_id, title, issue_number):
        super().__init__(item_id, title)
        self.issue_number = issue_number

    def display_info(self):
        """
        Implementasi method abstract untuk menampilkan info majalah.
        """
        print(f"[Magazine] ID: {self._item_id}, Title: {self.title}, Issue: {self.issue_number}")


# Kelas Library untuk mengelola koleksi item
class Library:
    """
    Kelas Library menyimpan dan mengelola semua item perpustakaan.
    """
    def __init__(self):
        self._collection = []  # protected list of items

    def add_item(self, item):
        """
        Menambahkan item (Book/Magazine) ke koleksi.
        """
        self._collection.append(item)
        print("Item berhasil ditambahkan ke perpustakaan.")

    def display_all_items(self):
        """
        Menampilkan semua item dalam koleksi.
        """
        if not self._collection:
            print("Perpustakaan kosong.")
        else:
            print("\n=== Daftar Koleksi Perpustakaan ===")
            for item in self._collection:
                item.display_info()

    def search_item(self, keyword):
        """
        Mencari item berdasarkan ID atau judul.
        """
        results = []
        for item in self._collection:
            if keyword.lower() in item.title.lower() or keyword == item._item_id:
                results.append(item)
        if results:
            print("\n=== Hasil Pencarian ===")
            for item in results:
                item.display_info()
        else:
            print("Item tidak ditemukan.")


# Simulasi penggunaan sistem
if __name__ == "__main__":
    # Inisialisasi perpustakaan
    library = Library()

    # Tambah beberapa item
    book1 = Book("B001", "Pemrograman Python", "Andi")
    book2 = Book("B002", "Belajar OOP", "Budi")
    mag1 = Magazine("M001", "Tech Today", "Edisi 15")

    library.add_item(book1)
    library.add_item(book2)
    library.add_item(mag1)

    # Tampilkan semua item
    library.display_all_items()

    # Pencarian item
    print("\n>>> Cari dengan kata 'Python':")
    library.search_item("Python")

    print("\n>>> Cari berdasarkan ID 'M001':")
    library.search_item("M001")

    print("\n>>> Cari berdasarkan ID tidak valid:")
    library.search_item("X999")
