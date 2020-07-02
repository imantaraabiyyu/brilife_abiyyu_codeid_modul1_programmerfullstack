SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_keluarga_berencana`
--
DROP TABLE IF EXISTS `list_pemakai_kontrasepsi`;
DROP TABLE IF EXISTS `list_kontrasepsi`;
DROP TABLE IF EXISTS `list_propinsi`;

-- --------------------------------------------------------

--
-- Table structure for table `list_kontrasepsi`
--

CREATE TABLE  `list_kontrasepsi` (
  `Id_Kontrasepsi` int(11) NOT NULL,
  `Nama_Kontrasepsi` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;




-- --------------------------------------------------------

--
-- Table structure for table `list_pemakai_kontrasepsi`
--

CREATE TABLE  `list_pemakai_kontrasepsi` (
  `Id_List` int(11) NOT NULL,
  `Id_Propinsi` int(11) NOT NULL,
  `Id_Kontrasepsi` int(11) NOT NULL,
  `Jumlah_Pemakai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;




-- --------------------------------------------------------

--
-- Table structure for table `list_propinsi`
--

CREATE TABLE  `list_propinsi` (
  `Id_Propinsi` int(11) NOT NULL,
  `Nama_Propinsi` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Indexes for dumped tables
--

--
-- Indexes for table `list_kontrasepsi`
--
ALTER TABLE `list_kontrasepsi`
  ADD PRIMARY KEY (`Id_Kontrasepsi`);

--
-- Indexes for table `list_pemakai_kontrasepsi`
--
ALTER TABLE `list_pemakai_kontrasepsi`
  ADD PRIMARY KEY (`Id_List`),
  ADD KEY `Id_Propinsi` (`Id_Propinsi`),
  ADD KEY `Id_Kontrasepsi` (`Id_Kontrasepsi`);

--
-- Indexes for table `list_propinsi`
--
ALTER TABLE `list_propinsi`
  ADD PRIMARY KEY (`Id_Propinsi`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `list_kontrasepsi`
--
ALTER TABLE `list_kontrasepsi`
  MODIFY `Id_Kontrasepsi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `list_pemakai_kontrasepsi`
--
ALTER TABLE `list_pemakai_kontrasepsi`
  MODIFY `Id_List` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `list_propinsi`
--
ALTER TABLE `list_propinsi`
  MODIFY `Id_Propinsi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `list_pemakai_kontrasepsi`
--
ALTER TABLE `list_pemakai_kontrasepsi`
  ADD CONSTRAINT `Id_Kontrasepsi` FOREIGN KEY (`Id_Kontrasepsi`) REFERENCES `list_kontrasepsi` (`Id_Kontrasepsi`),
  ADD CONSTRAINT `Id_Propinsi` FOREIGN KEY (`Id_Propinsi`) REFERENCES `list_propinsi` (`Id_Propinsi`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
