
package com.poterenko.email.html.postprocessor.xsd;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.*;


/**
 * <p>Java class for html-attributesType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="html-attributesType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="html-attribute" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlRootElement(name = "html-attributes")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "html-attributesType", propOrder = {
    "htmlAttribute"
})
public class HtmlAttributesType {

    @XmlElement(name = "html-attribute")
    protected List<String> htmlAttribute;

    /**
     * Gets the value of the htmlAttribute property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the htmlAttribute property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getHtmlAttribute().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link String }
     * 
     * 
     */
    public List<String> getHtmlAttribute() {
        if (htmlAttribute == null) {
            htmlAttribute = new ArrayList<String>();
        }
        return this.htmlAttribute;
    }

}
