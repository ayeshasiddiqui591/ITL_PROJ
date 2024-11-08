from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import pytest

@pytest.fixture
def driver():
    """Fixture to initialize and quit the WebDriver."""
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Uncomment to run headless
    service = Service('/usr/local/bin/chromedriver')  # Update if necessary
    driver = webdriver.Chrome(service=service, options=chrome_options)
    yield driver
    driver.quit()

def test_login(driver):
    """Test for successful login."""
    driver.get('http://localhost:3000/tab')  # Update with your actual URL
    driver.find_element(By.NAME, 'username').send_keys('8928459930')
    driver.find_element(By.NAME, 'password').send_keys('123456789')
    driver.find_element(By.XPATH, '//button[contains(text(), "Sign in")]').click()

    # Use WebDriverWait to wait for the URL to change to the dashboard
    WebDriverWait(driver, 10).until(EC.url_contains("dashboard"))

    # Print the current URL for debugging
    print("Current URL:", driver.current_url)

    # Assert that the current URL contains "dashboard"
    assert "dashboard" in driver.current_url, "Login failed, did not redirect to dashboard"
    print("Login test passed")

def test_submit_button_redirect(driver):
    """Test for clicking the submit button redirecting to dashboard.js."""
    driver.get('http://localhost:3000/tab')  # Update with your actual URL
    driver.find_element(By.NAME, 'username').send_keys('8928459930')
    driver.find_element(By.NAME, 'password').send_keys('123456789')
    
    # Click the "Sign in" button
    driver.find_element(By.XPATH, '//button[contains(text(), "Sign in")]').click()
    
    # Use WebDriverWait to wait for the URL to change to the dashboard
    WebDriverWait(driver, 10).until(EC.url_contains("dashboard"))

    # Check if redirected to dashboard.js
    assert "dashboard" in driver.current_url, "Redirection to dashboard failed"
    print("Submit button redirection test passed")

# Main block
if __name__ == "__main__":
    # Remove the initialization here, as pytest will handle it through the driver fixture.
    pass
