-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2023 at 09:56 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `remember`
--
CREATE DATABASE IF NOT EXISTS `remember` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `remember`;

-- --------------------------------------------------------

--
-- Table structure for table `candles`
--

CREATE TABLE `candles` (
  `commemorativeID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `commemoration_sites`
--

CREATE TABLE `commemoration_sites` (
  `commemorationSiteID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `commemorationName` varchar(25) NOT NULL,
  `commemorationAddress` varchar(30) NOT NULL,
  `imageName` varchar(150) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `commemorative`
--

CREATE TABLE `commemorative` (
  `commemorativeID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `deceasedName` varchar(30) NOT NULL,
  `biography` varchar(200) NOT NULL,
  `about` varchar(200) NOT NULL,
  `deceaseImageName` varchar(150) NOT NULL,
  `language` varchar(6) NOT NULL,
  `birthDate` date DEFAULT NULL,
  `deathDate` date DEFAULT NULL,
  `state` varchar(15) DEFAULT NULL,
  `city` varchar(30) NOT NULL,
  `partnerType` enum('Wife','Husband') DEFAULT NULL,
  `partnerName` varchar(20) DEFAULT NULL,
  `fatherName` varchar(20) DEFAULT NULL,
  `motherName` varchar(20) DEFAULT NULL,
  `childrenNames` varchar(400) DEFAULT NULL,
  `graveImageName` varchar(150) DEFAULT NULL,
  `graveYardName` varchar(20) DEFAULT NULL,
  `locationLink` varchar(100) DEFAULT NULL,
  `views` int(11) DEFAULT 0,
  `lastWatched` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `commemorative`
--

INSERT INTO `commemorative` (`commemorativeID`, `userID`, `deceasedName`, `biography`, `about`, `deceaseImageName`, `language`, `birthDate`, `deathDate`, `state`, `city`, `partnerType`, `partnerName`, `fatherName`, `motherName`, `childrenNames`, `graveImageName`, `graveYardName`, `locationLink`, `views`, `lastWatched`) VALUES
(16, 6, 'moshe', 'bla bla..', 'a lot of bla bla..', '2577aa78-63c2-4de1-952d-58a9607b6d28.jpeg', 'en', '2023-06-07', '2023-06-26', 'israel', 'jerusalem', 'Husband', 'haim', 'shlomi', 'miryam', 'msi,dbd', '5a601c1c-2bcf-4278-a75c-5e3345363c56.jpg', 'almin', 'jhgu uh iu ', NULL, '2023-06-24');

-- --------------------------------------------------------

--
-- Table structure for table `deceaseimages`
--

CREATE TABLE `deceaseimages` (
  `deceaseImageID` int(11) NOT NULL,
  `commemorativeID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `imageName` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deceaseimages`
--

INSERT INTO `deceaseimages` (`deceaseImageID`, `commemorativeID`, `userID`, `imageName`) VALUES
(30, 16, 6, '34d8ad53-d142-480a-8874-6dde12e180b0.jpeg'),
(31, 16, 6, 'f9dad094-8d14-430a-ab69-10d42fd0d4bb.webp');

-- --------------------------------------------------------

--
-- Table structure for table `flowers`
--

CREATE TABLE `flowers` (
  `commemorativeID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `lastUpdate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stories`
--

CREATE TABLE `stories` (
  `storyID` int(11) NOT NULL,
  `commemorativeID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `author` varchar(25) NOT NULL,
  `story` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stories`
--

INSERT INTO `stories` (`storyID`, `commemorativeID`, `userID`, `author`, `story`) VALUES
(16, 16, 6, 'a53', 'I used to go on a trip');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(150) NOT NULL,
  `role` enum('user','company','admin') NOT NULL,
  `state` varchar(15) NOT NULL,
  `city` varchar(15) NOT NULL,
  `birthDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `firstName`, `lastName`, `email`, `password`, `role`, `state`, `city`, `birthDate`) VALUES
(6, 'yoss', 'morgen', 'a534158711@gmail.com', 'd002b937f7ead7471ebebe79fa446f43e1f823b2883516a3e2d964bd318e960aefa43728f1cc47a1c67756200102cf67796f2c56108cd743fd9e0fd9ac0fd535', 'user', 'israel', 'jerusalem', '2023-05-03'),
(7, 'yoss', 'morg', 'yossmorgen@gmail.com ', 'b750180556f67f77647d1e761cfa0793b524862db3c67191b58de63367030ae710caa171f2dcc62120ef64eda248df639d5c11dfe53754d74f3b784a10921452', 'user', 'US', 'jerus', '2023-05-03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `candles`
--
ALTER TABLE `candles`
  ADD KEY `commemorativeID` (`commemorativeID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `commemoration_sites`
--
ALTER TABLE `commemoration_sites`
  ADD PRIMARY KEY (`commemorationSiteID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `commemorative`
--
ALTER TABLE `commemorative`
  ADD PRIMARY KEY (`commemorativeID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `deceaseimages`
--
ALTER TABLE `deceaseimages`
  ADD PRIMARY KEY (`deceaseImageID`),
  ADD KEY `commemorativeID` (`commemorativeID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `flowers`
--
ALTER TABLE `flowers`
  ADD KEY `commemorativeID` (`commemorativeID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `stories`
--
ALTER TABLE `stories`
  ADD PRIMARY KEY (`storyID`),
  ADD KEY `commemorativeID` (`commemorativeID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `commemoration_sites`
--
ALTER TABLE `commemoration_sites`
  MODIFY `commemorationSiteID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `commemorative`
--
ALTER TABLE `commemorative`
  MODIFY `commemorativeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `deceaseimages`
--
ALTER TABLE `deceaseimages`
  MODIFY `deceaseImageID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `stories`
--
ALTER TABLE `stories`
  MODIFY `storyID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
