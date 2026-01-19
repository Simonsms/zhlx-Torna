package cn.torna.common;

import cn.torna.common.util.MarkdownUtil;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class MarkdownUtilTest {

    @Test
    void testIsMarkdown_withNullInput() {
        assertFalse(MarkdownUtil.isMarkdown(null));
    }

    @Test
    void testIsMarkdown_withEmptyString() {
        assertFalse(MarkdownUtil.isMarkdown(""));
    }

    @Test
    void testIsMarkdown_withWhitespaceOnly() {
        assertFalse(MarkdownUtil.isMarkdown("   "));
    }

    @Test
    void testIsMarkdown_withPlainTextInput() {
        String plainText = "这是一个普通的文本，不包含任何Markdown语法。";
        assertFalse(MarkdownUtil.isMarkdown(plainText));
    }

    @Test
    void testIsMarkdown_withHeadings() {
        assertTrue(MarkdownUtil.isMarkdown("# 一级标题"));
        assertTrue(MarkdownUtil.isMarkdown("## 二级标题"));
        assertTrue(MarkdownUtil.isMarkdown("###### 六级标题"));
    }

    @Test
    void testIsMarkdown_withBoldText() {
        assertTrue(MarkdownUtil.isMarkdown("这是**加粗文字**"));
        assertTrue(MarkdownUtil.isMarkdown("这是__加粗文字__"));
    }

    @Test
    void testIsMarkdown_withItalicText() {
        assertTrue(MarkdownUtil.isMarkdown("这是*斜体文字*"));
        assertTrue(MarkdownUtil.isMarkdown("这是_斜体文字_"));
    }

    @Test
    void testIsMarkdown_withLinks() {
        assertTrue(MarkdownUtil.isMarkdown("访问[阿里云](https://www.aliyun.com)"));
    }

    @Test
    void testIsMarkdown_withImages() {
        assertTrue(MarkdownUtil.isMarkdown("![图片](image.png)"));
    }

    @Test
    void testIsMarkdown_withLists() {
        assertTrue(MarkdownUtil.isMarkdown("- 无序列表项"));
        assertTrue(MarkdownUtil.isMarkdown("* 无序列表项"));
        assertTrue(MarkdownUtil.isMarkdown("+ 无序列表项"));
        assertTrue(MarkdownUtil.isMarkdown("1. 有序列表项"));
        assertTrue(MarkdownUtil.isMarkdown("2. 有序列表项"));
    }

    @Test
    void testIsMarkdown_withInlineCode() {
        assertTrue(MarkdownUtil.isMarkdown("使用 `code` 标记代码"));
    }

    @Test
    void testIsMarkdown_withBlockquotes() {
        assertTrue(MarkdownUtil.isMarkdown("> 这是一个引用块"));
        assertFalse(MarkdownUtil.isMarkdown(">引用文本"));
        assertTrue(MarkdownUtil.isMarkdown("  > 带缩进的引用"));
    }

    @Test
    void testIsMarkdown_withTables() {
        // 标准表格
        String table1 = "| 列1 | 列2 | 列3 |\n" +
                        "|---|---|---|\n" +
                        "| 数据1 | 数据2 | 数据3 |";
        assertTrue(MarkdownUtil.isMarkdown(table1));

        // 带对齐的表格
        String table2 = "| 左对齐 | 居中 | 右对齐 |\n" +
                        "|:---|:---:|---:|\n" +
                        "| A | B | C |";
        assertTrue(MarkdownUtil.isMarkdown(table2));

        // 简单表格行
        assertTrue(MarkdownUtil.isMarkdown("| Header 1 | Header 2 |"));
        
        // 表格分隔符
        assertTrue(MarkdownUtil.isMarkdown("|---|---|"));
        assertTrue(MarkdownUtil.isMarkdown("|:---|---:|"));
    }

    @Test
    void testIsMarkdown_withComplexMarkdown() {
        String complexMarkdown = "# 标题\n" +
                "            \n" +
                "            这是**加粗**和*斜体*文本。\n" +
                "            \n" +
                "            - 列表项1\n" +
                "            - 列表项2\n" +
                "            \n" +
                "            [链接](http://example.com)\n" +
                "            \n" +
                "            `行内代码`";
        assertTrue(MarkdownUtil.isMarkdown(complexMarkdown));
    }
}
