-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- ホスト: 127.0.0.1
-- 生成日時: 2026-05-12 04:24:27
-- サーバのバージョン： 10.4.32-MariaDB
-- PHP のバージョン: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `group_list_db`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `class`
--

CREATE TABLE `class` (
  `class_code` varchar(100) NOT NULL,
  `class_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='クラスコードテーブル';

--
-- テーブルのデータのダンプ `class`
--

INSERT INTO `class` (`class_code`, `class_name`) VALUES
('US1A', '大学Wスクール(SE養成) 1年'),
('US2A', '大学Wスクール(SE養成) 2年'),
('US3A', '大学Wスクール(SE養成) 3年'),
('US4A', '大学Wスクール(SE養成) 4年');

-- --------------------------------------------------------

--
-- テーブルの構造 `members`
--

CREATE TABLE `members` (
  `No` int(100) NOT NULL,
  `date` date NOT NULL,
  `time` varchar(10) NOT NULL,
  `class_code` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `HP_link` varchar(100) NOT NULL,
  `link_title` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `members`
--

INSERT INTO `members` (`No`, `date`, `time`, `class_code`, `title`, `HP_link`, `link_title`) VALUES
(1, '2027-01-05', '1', 'US4A', 'ｵｶｼｨﾚｶﾞｼｨ乗りについて', 'home.html', 'ちはるんの卒研紹介ぺーじ♡'),
(2, '2027-01-05', '3', 'US3A', '原発は再稼働するべきか否か', 'https://www.tepco.co.jp/index-j.html', '東電HP'),
(3, '2027-01-06', '5', 'US2A', 'ﾋﾟｽﾄﾝ横向きｴﾝｼﾞﾝにﾀｰﾋﾞﾝは乗っけるべきか', 'https://www.subaru.jp/', 'スバルHP'),
(4, '2027-01-06', '1', 'US1A', 'ECUチューニング', 'https://note.com/labratory_ktech/n/n192a1be865c2', 'フルコン化に必要なもの');

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`class_code`);

--
-- テーブルのインデックス `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`No`),
  ADD KEY `class_code` (`class_code`);

--
-- ダンプしたテーブルの AUTO_INCREMENT
--

--
-- テーブルの AUTO_INCREMENT `members`
--
ALTER TABLE `members`
  MODIFY `No` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- ダンプしたテーブルの制約
--

--
-- テーブルの制約 `members`
--
ALTER TABLE `members`
  ADD CONSTRAINT `members_ibfk_1` FOREIGN KEY (`class_code`) REFERENCES `class` (`class_code`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
