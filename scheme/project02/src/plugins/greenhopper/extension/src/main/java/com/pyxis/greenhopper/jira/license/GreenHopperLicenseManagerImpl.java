package com.pyxis.greenhopper.jira.license;

import com.atlassian.extras.api.LicenseManager;
import com.atlassian.extras.api.Product;
import com.atlassian.extras.api.ProductLicense;
import com.atlassian.extras.api.greenhopper.GreenHopperLicense;
import com.atlassian.extras.api.jira.JiraLicense;
import com.atlassian.extras.common.LicenseException;
import com.atlassian.greenhopper.jira.JIRAResource;
import com.atlassian.greenhopper.util.BuildProperties;
import com.atlassian.jira.bc.license.JiraLicenseService;
import com.atlassian.jira.license.LicenseDetails;
import com.atlassian.upm.license.compatibility.CompatibleLicenseStatus;
import com.atlassian.upm.license.compatibility.PluginLicenseManagerAccessor;
import org.springframework.beans.factory.annotation.Autowired;

public class GreenHopperLicenseManagerImpl implements GreenHopperLicenseManager {

	@Autowired
	private JiraLicenseService jiraLicenseService;

	@Autowired
	private BuildProperties buildProperties;

	@Autowired
	private PluginLicenseManagerAccessor pluginLicenseManagerAccessor;

	@Autowired
	private GreenHopperLicenseDetailsUtil licenseDetailsUtil;

	@JIRAResource
	private LicenseManager licenseManager;

	public String getServerId() {
		return this.jiraLicenseService.getServerId();
	}

	public LicenseDetails getLicense() {
		ProductLicense license = this.pluginLicenseManagerAccessor.getPluginLicenseManager().getCurrentLicense();
		return this.licenseDetailsUtil.getLicenseDetails(license);
	}

	public LicenseDetails getLicense(String licenseString) {
		ProductLicense license = this.pluginLicenseManagerAccessor.getPluginLicenseManager().getLicense(licenseString);
		return this.licenseDetailsUtil.getLicenseDetails(license);
	}

	private JiraLicense getJIRALicense() {
		return (JiraLicense) this.licenseManager.getLicense(this.jiraLicenseService.getLicense().getLicenseString()).getProductLicense(Product.JIRA);
	}

	public String getLicenseRedirectUrl() {
		return this.pluginLicenseManagerAccessor.getPluginLicenseManager().getPluginLicenseAdministrationUri().toASCIIString();
	}

	public void setLicense(String licenseString)
		throws LicenseException {
		doVerify(licenseString);
		this.pluginLicenseManagerAccessor.getPluginLicenseManager().setLicense(licenseString);
	}

	public void verifyOnStartup()
		throws LicenseException {
		doVerify();
	}

	public void verify()
		throws LicenseException {
		doVerify();
	}

	private void doVerify() throws LicenseException {
		GreenHopperLicense ghLicense = (GreenHopperLicense) this.pluginLicenseManagerAccessor.getPluginLicenseManager().getCurrentLicense();
		CompatibleLicenseStatus status = this.pluginLicenseManagerAccessor.getPluginLicenseManager().getCurrentLicenseStatus();
		verifyLicenseAndStatus(ghLicense, status);
	}

	private void doVerify(String licenseString)
		throws LicenseException {
		GreenHopperLicense ghLicense = (GreenHopperLicense) this.pluginLicenseManagerAccessor.getPluginLicenseManager().getLicense(licenseString);
		CompatibleLicenseStatus status = this.pluginLicenseManagerAccessor.getPluginLicenseManager().getLicenseStatus(licenseString);
		verifyLicenseAndStatus(ghLicense, status);
	}

	private void verifyLicenseAndStatus(GreenHopperLicense ghLicense, CompatibleLicenseStatus status)
		throws LicenseException {
	}

	public boolean isOneShotTrialAvailable() {
		return false;
	}

	public void startOneShotTrialNow() {
	}
}