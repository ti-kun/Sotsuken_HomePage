-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- ホスト: 127.0.0.1
-- 生成日時: 2026-05-26 04:12:32
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
-- テーブルの構造 `classmate`
--

CREATE TABLE `classmate` (
  `No` int(7) NOT NULL,
  `pass` varchar(100) NOT NULL DEFAULT 'pass',
  `Name` varchar(100) NOT NULL,
  `Mail` varchar(255) NOT NULL,
  `Link` varchar(255) NOT NULL,
  `vote` int(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `classmate`
--

INSERT INTO `classmate` (`No`, `pass`, `Name`, `Mail`, `Link`, `vote`) VALUES
(1230212, 'pass', '鈴木　隆友', 'suzuki@mail.com', 'suzuki.html', NULL),
(1230307, 'pass', '菊地　蓮斗', 'kikuti@mail.com', 'kikuti.html', NULL),
(1230312, 'pass', '髙野　涼太郎', 'takano@mail.com', 'takano.html', NULL),
(1238101, 'pass', '阿久津　幸翼', 'akutu@mail.com', 'akutu.html', NULL),
(1238102, 'pass', '阿部　真大', 'rizamaru', 'rizamaru', NULL),
(1238103, 'pass', '飯塚　琉', 'takenoko@mail.com', 'takenoko.html', NULL),
(1238104, 'pass', '石川　一輝', 'kazuo@mail.com', 'kazuo.html', NULL),
(1238105, 'pass', '石橋　龍河', 'ryuuga@mail.com', 'ryuuga.html', NULL),
(1238106, 'pass', '岩瀬　陸斗', 'iwase@mail.com', 'iwase.html', NULL),
(1238107, 'pass', '加藤　悠記', 'tubo@mail.com', 'tubo.html', NULL),
(1238109, 'pass', '菅野　晴天', 'tiharu0317773@gmail.com', '../html/home.html', 1230212),
(1238111, 'pass', '小島　未有', 'kojima@mail.com', 'kojima.html', NULL),
(1238112, 'pass', '須藤　秀之介', 'su-san@mail.com', 'su-san.html', NULL),
(1238113, 'pass', '髙津戸　啓太', 'yosigyuu@mail.com', 'yosigyuu.html', NULL),
(1238114, 'pass', '田名網　惇生', 'anchobi@mail.com', 'anchobi.html', NULL),
(1238115, 'pass', '手塚　大翔', 'teduka@mail.com', 'teduka.html', NULL),
(1238116, 'pass', '鳥山　遼太', 'toriyama@mail.com', 'toriyama.html', NULL),
(1238117, 'pass', '永山　嵩都', 'nagayama@mail.com', 'nagayama.html', NULL),
(1238118, 'pass', '半田　涼真', 'shadow@mail.com', 'shadow.html', NULL),
(1238119, 'pass', '舩田　浩希', 'hunada@mail.com', 'hunada.html', NULL),
(1238120, 'pass', '細谷　隼輔', 'hosoya@mail.com', 'hosoya.html', NULL),
(1238121, 'pass', '前田　晃佑', 'maeda@mail.com', 'maeda.html', NULL),
(1238122, 'pass', '松岡　功大', 'mattyann@mail.com', 'mattyann.html', 1238118),
(1238401, 'pass', '有吉　凜', 'ariyosi@mail.com', 'ariyosi.html', NULL);

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
(2, '2027-01-05', '2', 'US3A', '原発は再稼働するべきか否か', 'https://www.tepco.co.jp/index-j.html', '東電HP'),
(3, '2027-01-06', '3', 'US2A', 'ﾋﾟｽﾄﾝ横向きｴﾝｼﾞﾝにﾀｰﾋﾞﾝは乗っけるべきか', 'https://www.subaru.jp/', 'スバルHP'),
(4, '2027-01-06', '1', 'US1A', 'ECUチューニング', 'https://note.com/labratory_ktech/n/n192a1be865c2', 'フルコン化に必要なもの'),
(5, '2027-01-05', '1', 'US1A', 'からあげはおいしい', 'https://note.com/travelingfoodlab/n/n58d0dfb33e43', '鶏のから揚げの作り方'),
(6, '2027-01-05', '2', 'US2A', 'ハンバーガー', 'https://www.mos.jp/', 'もす'),
(7, '2027-01-05', '3', 'US2A', 'ﾊﾝﾊﾞｰｶﾞｰ', 'https://www.burgerking.co.jp/home', 'ばーきん'),
(8, '2027-01-05', '3', 'US3A', 'hamburger', 'https://www.mcdonalds.co.jp/', 'まっく'),
(9, '2027-01-05', '4', 'US4A', 'ちょうどいいAHONDARA', 'https://www.honda.co.jp/', 'AHONDARA'),
(10, '2027-01-05', '4', 'US3A', 'やっちまったﾆｯｻﾝ', 'https://www.nissan.co.jp/', 'OSSAN'),
(11, '2027-01-05', '5', 'US3A', 'あそべるKei!!', 'https://www.suzuki.co.jp/', 'でかまんび'),
(12, '2027-01-05', '5', 'US2A', 'みつおか', 'https://www.mitsuoka-motor.com/', 'M55普通にほしい'),
(13, '2027-01-05', '6', 'US3A', 'ろすた！！', 'https://www.mazda.co.jp/', 'NAはｶﾜｲｲ'),
(14, '2027-01-05', '6', 'US2A', 'はいぱわーたーぼ+はいぱわーたーぼ', 'https://www.mitsubishi-motors.co.jp/', 'DELICAってなんですか？？？\r\nランサーはまだですか？？？？？？？？'),
(15, '2027-01-06', '1', 'US2A', 'Wスリッドフェンダーはやめに色塗らなきゃ', 'https://www.k2k2.jp/', '平山自動車'),
(16, '2027-01-06', '2', 'US1A', '強化クラッチっていいよね', 'https://www.oguraclutch.co.jp/', 'ﾂｲﾝﾌﾟﾚｰﾄ!!'),
(17, '2027-01-06', '2', 'US1A', 'デフもやりたいよね', 'https://osgiken.co.jp/index.php', 'OSぎけん'),
(18, '2027-01-06', '3', 'US2A', 'ぶれーきだいじ！', 'https://www.brembo.com/ja', 'あかきゃりぱー'),
(19, '2027-01-06', '4', 'US3A', 'こくさんしかかたんすね', 'https://www.endless-sport.co.jp/', 'あおきゃりぱー'),
(20, '2027-01-06', '4', 'US4A', 'ｲｶﾁｨ羽ﾎｼｨ', 'https://www.voltex.ne.jp/', 'ぼるてっくす'),
(21, '2027-01-06', '5', 'US4A', 'りあばんぱーほしい', 'https://www.shining-speed.net/', 'しゃいすぴ'),
(22, '2027-01-06', '5', 'US3A', 'いいあしください', 'https://ohlins-czj.jp/', 'おーりんず'),
(23, '2027-01-06', '6', 'US2A', 'ﾌﾙﾁｭｰﾝｴﾝｼﾞﾝください！！', 'https://kondoengineering.com/', 'EJ20改22'),
(24, '2027-01-06', '6', 'US1A', 'らじえーたーきゃっぷつかってますさいんください', 'https://www.zerosports.co.jp/', 'ぜろすぽ');

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`class_code`);

--
-- テーブルのインデックス `classmate`
--
ALTER TABLE `classmate`
  ADD PRIMARY KEY (`No`);

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
  MODIFY `No` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
