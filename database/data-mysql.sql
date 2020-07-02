INSERT INTO `list_kontrasepsi` (`Id_Kontrasepsi`, `Nama_Kontrasepsi`) VALUES
(1, 'Pil'),
(2,'Kondom'),
(3,'IUD');

INSERT INTO `list_propinsi` (`Id_Propinsi`, `Nama_Propinsi`) VALUES
(1, 'Aceh'),
(2, 'Sumatera Utara'),
(3, 'Sumatera Barat'),
(4, 'Riau');

INSERT INTO `list_pemakai_kontrasepsi` (`Id_List`, `Id_Propinsi`, `Id_Kontrasepsi`, `Jumlah_Pemakai`) VALUES
(1, 1, 1, 50),
(2, 1, 2, 66),
(3, 1, 3, 25),
(4, 2, 1, 100);

