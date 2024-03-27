

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";




CREATE TABLE `t_classify` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '分类名',
  `storage` text COLLATE utf8mb4_unicode_ci COMMENT '-'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



INSERT INTO `t_classify` (`id`, `user_id`, `name`, `storage`) VALUES
(1, '1', 'articles for daily use', NULL),
(2, '1', 'digital product', NULL);



CREATE TABLE `t_product` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `classify_id` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '分类ID',
  `name` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '商品名',
  `description` text COLLATE utf8mb4_unicode_ci COMMENT '描述',
  `image` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '图片地址',
  `num` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '数量',
  `tags` text COLLATE utf8mb4_unicode_ci COMMENT '数量',
  `status` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '物品状态',
  `storage` text COLLATE utf8mb4_unicode_ci COMMENT '-'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



INSERT INTO `t_product` (`id`, `user_id`, `classify_id`, `name`, `description`, `image`, `num`, `tags`, `status`, `storage`) VALUES
(3, '1', '2', 'iPhone 13', 'The iPhone 13 has successfully reduced the size of the notch by moving the earpiece upwards in its design, not only increasing the screen-to-body ratio but also representing a further enhancement of the Face ID area.', '1708740088399-880402926.png', '1', 'Tag1,Tag2,Tag3', '1', '2024-02-24'),
(4, '1', '2', 'iPad 2020', 'Compared to the previous generation, the appearance of the iPad has not changed, with a screen that still features non-full laminated design. The chip has been upgraded from the previous A10 Fusion to the A12 Bionic, and it supports the first-generation Apple Pencil. It comes with a 20W PD charger and a Lightning to Type-C data cable in the box. It comes pre-installed with the iPadOS 14 operating system, has a 32.4 watt-hour battery, and is available in 32GB and 128GB storage options.', '1708741600760-519227733.png', '1', 'Tag1,Tag2,Tag3', '1', '2024-02-24'),
(5, '1', '2', 'Macbook', 'The MacBook was Apple\'s first budget notebook computer to feature an Intel Core Duo processor, with two speed options available: 1.83GHz and 2.0GHz. The MacBook introduced several new designs, including a black or white casing similar to the iBook G4, as well as a new architecture. The MacBook series, along with the professional MacBook Pro series, formed a complete product line.', '1708741763837-945936870.png', '1', 'Tag1,Tag2,Tag3', '2', '2024-02-24'),
(6, '1', '1', 'Table', 'Placed in the living room', '1708742087689-469999439.png', '1', 'Tag1,Tag2,Tag3', '1', '2024-02-24'),
(7, '1', '1', 'Chair', 'Placed on the balcony', '1708742115755-423431980.png', '1', 'Tag1,Tag2,Tag3', '2', '2024-02-24'),
(10, '1', '2', '123', '123', '1708782377150-513488582.jpeg', '1', 'Tag1,Tag2,Tag3', '2', '2024-02-24');

-- --------------------------------------------------------

--
-- 表的结构 `t_shoppingList`
--

CREATE TABLE `t_shoppingList` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '商品名',
  `num` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '数量',
  `description` text COLLATE utf8mb4_unicode_ci COMMENT '描述',
  `storage` text COLLATE utf8mb4_unicode_ci COMMENT '-'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 转存表中的数据 `t_shoppingList`
--

INSERT INTO `t_shoppingList` (`id`, `user_id`, `name`, `num`, `description`, `storage`) VALUES
(2, '1', 'toilet soap', '10', 'toilet soap', NULL),
(3, '1', 'toilet paper', '10', 'toilet paper', NULL),
(4, '1', 'socks', '10', 'socks', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `t_user`
--

CREATE TABLE `t_user` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '邮箱',
  `password` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '密码',
  `storage` text COLLATE utf8mb4_unicode_ci COMMENT '-'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 转存表中的数据 `t_user`
--

INSERT INTO `t_user` (`id`, `email`, `password`, `storage`) VALUES
(1, 'test@qq.com', '123456', NULL),
(2, 'test2@qq.com', '123456', NULL);

--
-- 转储表的索引
--

--
-- 表的索引 `t_classify`
--
ALTER TABLE `t_classify`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `t_product`
--
ALTER TABLE `t_product`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `t_shoppingList`
--
ALTER TABLE `t_shoppingList`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `t_user`
--
ALTER TABLE `t_user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `t_classify`
--
ALTER TABLE `t_classify`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 使用表AUTO_INCREMENT `t_product`
--
ALTER TABLE `t_product`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 使用表AUTO_INCREMENT `t_shoppingList`
--
ALTER TABLE `t_shoppingList`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 使用表AUTO_INCREMENT `t_user`
--
ALTER TABLE `t_user`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
