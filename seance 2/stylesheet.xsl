<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" indent="yes"/>

  <xsl:template match="recipe">
    <html>
      <head><title><xsl:value-of select="@title"/> </title></head>
      <body>
      <h1> <xsl:value-of select="@title"/> </h1>
      <xsl:if test="author">
        <p>Recette proposée par <xsl:value-of select="author"> </xsl:value-of></p>
      </xsl:if>
      <ul>
        <xsl:for-each select="tags/tag">
          <li>
            <xsl:value-of select="."/>
          </li>
        </xsl:for-each>
      </ul>
      <img src="{image/@link}"></img>
      <p><xsl:value-of select="content/introduction"></xsl:value-of></p>

      <h2>Ingrédients / pour <xsl:value-of select="content/ingredients/@quantity"/> personnes</h2>
      <ul>
        <xsl:for-each select="content/ingredients/item">
          <li>
            <xsl:value-of select="."/>
          </li>
        </xsl:for-each>
      </ul>

      <h2>Réalisation</h2>
      <ul>
        <xsl:for-each select="content/realisation/*">
          <li>
            <xsl:value-of select="name()"/> : 
            <b><xsl:value-of select="."> </xsl:value-of> <xsl:value-of select="./@*"> </xsl:value-of></b>
          </li>
        </xsl:for-each>
      </ul>

      <h2>Préparation</h2>
      <ol>
        <xsl:for-each select="content/direction/step">
          <li>
            <xsl:value-of select="."> </xsl:value-of>
          </li>
        </xsl:for-each>
      </ol>

      <xsl:if test="content/dietetic">
        <h2>Diététique</h2>
        <p><xsl:value-of select="content/dietetic/."> </xsl:value-of></p>
      </xsl:if>

      <xsl:if test="content/tricks">
        <h2>Astuces</h2>
        <p><xsl:value-of select="content/tricks/."> </xsl:value-of></p>
      </xsl:if>

      </body>
    </html>
  </xsl:template>



</xsl:stylesheet>
