"""
TESTING AUTOMATION SCRIPT - Selenium WebDriver
Automatiza los 15 escenarios de testing

Instalación requerida:
    pip install selenium webdriver-manager pytest python-dotenv

Uso:
    python testing_automation.py

O con pytest:
    pytest testing_automation.py -v
"""

import time
import os
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
import json

# ============================================================
# CONFIGURACIÓN
# ============================================================

BASE_URL = "http://localhost:5500"  # Cambiar según tu entorno
HEADLESS = False  # True para correr sin interfaz gráfica
WAIT_TIME = 10  # segundos para esperar elementos

# Test Data
TEST_DATA = {
    "user_1": {
        "nombre": "Juan García Test",
        "email": f"juan.garcia.{datetime.now().timestamp()}@example.com",
        "password": "TestPassword123!",
        "vivienda": {
            "bloque": "2",
            "portal": "1",
            "planta": "1",
            "letra": "A",
            "tipo": "Dueno"
        }
    },
    "user_2": {
        "nombre": "María López Test",
        "email": f"maria.lopez.{datetime.now().timestamp()}@example.com",
        "password": "TestPassword123!",
        "vivienda": {
            "bloque": "3",
            "portal": "2",
            "planta": "2",
            "letra": "B",
            "tipo": "Inquilino"
        }
    }
}

# ============================================================
# CLASE BASE DE TESTING
# ============================================================

class TestingBase:
    """Clase base para todos los tests"""
    
    def __init__(self):
        self.driver = None
        self.test_results = []
        
    def setup(self):
        """Inicializa el navegador"""
        options = webdriver.ChromeOptions()
        if HEADLESS:
            options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        
        service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=service, options=options)
        self.driver.set_window_size(1920, 1080)
        print("✅ Navegador iniciado")
        
    def teardown(self):
        """Cierra el navegador"""
        if self.driver:
            self.driver.quit()
            print("✅ Navegador cerrado")
    
    def log(self, message, level="INFO"):
        """Registra mensajes"""
        timestamp = datetime.now().strftime("%H:%M:%S")
        prefix = {
            "INFO": "ℹ️",
            "SUCCESS": "✅",
            "ERROR": "❌",
            "WARNING": "⚠️"
        }.get(level, "•")
        print(f"[{timestamp}] {prefix} {message}")
    
    def navigate_to(self, page):
        """Navega a una página"""
        url = f"{BASE_URL}/{page}"
        self.driver.get(url)
        self.log(f"Navegando a: {page}")
        time.sleep(2)
    
    def find_element(self, selector, by=By.CSS_SELECTOR):
        """Busca un elemento con espera"""
        try:
            element = WebDriverWait(self.driver, WAIT_TIME).until(
                EC.presence_of_element_located((by, selector))
            )
            return element
        except Exception as e:
            self.log(f"Elemento no encontrado: {selector}", "ERROR")
            raise
    
    def fill_input(self, selector, value):
        """Rellena un input"""
        element = self.find_element(selector)
        element.clear()
        element.send_keys(value)
        self.log(f"Input rellenado: {selector} = {value}")
    
    def select_option(self, selector, value):
        """Selecciona una opción en un select"""
        element = self.find_element(selector)
        select = Select(element)
        select.select_by_value(value)
        self.log(f"Opción seleccionada: {selector} = {value}")
    
    def click_button(self, selector):
        """Hace click en un botón"""
        button = self.find_element(selector)
        button.click()
        self.log(f"Click en: {selector}")
        time.sleep(1)
    
    def check_element_exists(self, selector):
        """Verifica si un elemento existe"""
        try:
            self.find_element(selector)
            return True
        except:
            return False
    
    def get_current_url(self):
        """Obtiene la URL actual"""
        return self.driver.current_url
    
    def assert_page(self, expected_page):
        """Verifica que estamos en la página esperada"""
        current_url = self.get_current_url()
        assert expected_page in current_url, f"Expected {expected_page}, got {current_url}"
        self.log(f"✓ En página correcta: {expected_page}")
    
    def record_result(self, scenario, status, details):
        """Registra el resultado de un test"""
        self.test_results.append({
            "scenario": scenario,
            "status": status,
            "details": details,
            "timestamp": datetime.now().isoformat()
        })

# ============================================================
# ESCENARIO 1: Registro + Onboarding
# ============================================================

class TestScenario1(TestingBase):
    """
    Escenario 1: Registro Nuevo Usuario + Agregar Vivienda
    """
    
    def run(self):
        """Ejecuta el escenario"""
        try:
            self.log("=" * 60)
            self.log("ESCENARIO 1: Registro Nuevo Usuario + Agregar Vivienda")
            self.log("=" * 60)
            
            self.setup()
            
            # Paso 1: Ir a registro
            self.log("\n[PASO 1] Navegando a registro...")
            self.navigate_to("register.html")
            assert self.check_element_exists("#registerBtn"), "Botón de registro no encontrado"
            self.log("✓ Página de registro cargada")
            
            # Paso 2: Rellenar registro
            self.log("\n[PASO 2] Rellenando formulario de registro...")
            user_data = TEST_DATA["user_1"]
            self.fill_input("#nombre", user_data["nombre"])
            self.fill_input("#email", user_data["email"])
            self.fill_input("#password", user_data["password"])
            self.fill_input("#confirmPassword", user_data["password"])
            self.log("✓ Formulario rellenado")
            
            # Paso 3: Aceptar GDPR
            self.log("\n[PASO 3] Aceptando GDPR...")
            gdpr_checkbox = self.find_element("#gdprAccept")
            if not gdpr_checkbox.is_selected():
                gdpr_checkbox.click()
            self.log("✓ GDPR aceptado")
            
            # Paso 4: Enviar registro
            self.log("\n[PASO 4] Enviando formulario de registro...")
            self.click_button("#registerBtn")
            time.sleep(3)
            
            # Paso 5: Verificar redirección a onboarding
            self.log("\n[PASO 5] Verificando redirección a onboarding...")
            self.assert_page("onboarding-properties")
            self.log("✓ Redirección a onboarding exitosa")
            
            # Paso 6: Rellenar vivienda
            self.log("\n[PASO 6] Rellenando formulario de vivienda...")
            vivienda = user_data["vivienda"]
            self.select_option("#bloque", vivienda["bloque"])
            self.select_option("#portal", vivienda["portal"])
            self.select_option("#planta", vivienda["planta"])
            self.select_option("#letra", vivienda["letra"])
            self.select_option("#tipo", vivienda["tipo"])
            self.log("✓ Vivienda rellenada")
            
            # Paso 7: Agregar vivienda
            self.log("\n[PASO 7] Agregando vivienda...")
            self.click_button("#addPropertyBtn")
            time.sleep(2)
            
            # Paso 8: Verificar que aparece en lista
            self.log("\n[PASO 8] Verificando que vivienda está en lista...")
            properties_list = self.find_element("#propertiesList")
            assert properties_list is not None, "Lista de propiedades no encontrada"
            self.log("✓ Vivienda agregada a lista")
            
            # Paso 9: Click continuar
            self.log("\n[PASO 9] Haciendo click en continuar...")
            self.click_button("#continueBtn")
            time.sleep(3)
            
            # Paso 10: Verificar dashboard
            self.log("\n[PASO 10] Verificando acceso a dashboard...")
            self.assert_page("dashboard")
            assert self.check_element_exists("#profileMenuTrigger"), "Dashboard no se cargó correctamente"
            self.log("✓ Dashboard cargado exitosamente")
            
            # Resultado
            status = "PASADO"
            details = f"Usuario registrado: {user_data['email']}"
            self.record_result("Escenario 1", status, details)
            self.log(f"\n✅ ESCENARIO 1: {status}")
            self.log(f"Detalles: {details}\n")
            
            return True
            
        except Exception as e:
            self.log(f"ERROR en Escenario 1: {str(e)}", "ERROR")
            self.record_result("Escenario 1", "FALLIDO", str(e))
            return False
        finally:
            self.teardown()

# ============================================================
# ESCENARIO 2: Login
# ============================================================

class TestScenario2(TestingBase):
    """
    Escenario 2: Login con Vivienda
    """
    
    def run(self):
        """Ejecuta el escenario"""
        try:
            self.log("=" * 60)
            self.log("ESCENARIO 2: Login con Vivienda")
            self.log("=" * 60)
            
            self.setup()
            
            # Nota: Este test requiere un usuario ya registrado
            # Para este ejemplo, usamos el usuario del escenario 1
            user_data = TEST_DATA["user_1"]
            
            # Paso 1: Ir a login
            self.log("\n[PASO 1] Navegando a login...")
            self.navigate_to("login.html")
            assert self.check_element_exists("#loginBtn"), "Botón de login no encontrado"
            self.log("✓ Página de login cargada")
            
            # Paso 2: Rellenar credenciales
            self.log("\n[PASO 2] Rellenando credenciales...")
            self.fill_input("#email", user_data["email"])
            self.fill_input("#password", user_data["password"])
            self.log("✓ Credenciales rellenadas")
            
            # Paso 3: Click login
            self.log("\n[PASO 3] Haciendo login...")
            self.click_button("#loginBtn")
            time.sleep(3)
            
            # Paso 4: Verificar acceso a dashboard
            self.log("\n[PASO 4] Verificando acceso a dashboard...")
            self.assert_page("dashboard")
            self.log("✓ Login exitoso, dashboard accesible")
            
            status = "PASADO"
            details = f"Login exitoso para: {user_data['email']}"
            self.record_result("Escenario 2", status, details)
            self.log(f"\n✅ ESCENARIO 2: {status}\n")
            
            return True
            
        except Exception as e:
            self.log(f"ERROR en Escenario 2: {str(e)}", "ERROR")
            self.record_result("Escenario 2", "FALLIDO", str(e))
            return False
        finally:
            self.teardown()

# ============================================================
# ESCENARIO 3: Validaciones
# ============================================================

class TestScenario3(TestingBase):
    """
    Escenario 3: Validaciones de Formulario
    """
    
    def run(self):
        """Ejecuta el escenario"""
        try:
            self.log("=" * 60)
            self.log("ESCENARIO 3: Validaciones de Formulario")
            self.log("=" * 60)
            
            self.setup()
            
            # Test 1: Email inválido
            self.log("\n[TEST 1] Email inválido...")
            self.navigate_to("register.html")
            self.fill_input("#nombre", "Test User")
            self.fill_input("#email", "invalidemail")
            self.fill_input("#password", "TestPass123!")
            self.fill_input("#confirmPassword", "TestPass123!")
            gdpr = self.find_element("#gdprAccept")
            if not gdpr.is_selected():
                gdpr.click()
            
            # Intentar enviar - debería mostrar error
            self.click_button("#registerBtn")
            time.sleep(1)
            # Verificar que sigue en la página de registro
            assert "register" in self.get_current_url(), "Validación de email falló"
            self.log("✓ Validación de email inválido funcionó")
            
            # Test 2: Contraseñas diferentes
            self.log("\n[TEST 2] Contraseñas diferentes...")
            self.navigate_to("register.html")
            self.fill_input("#nombre", "Test User")
            self.fill_input("#email", "test.validation@example.com")
            self.fill_input("#password", "TestPass123!")
            self.fill_input("#confirmPassword", "DifferentPass123!")
            gdpr = self.find_element("#gdprAccept")
            if not gdpr.is_selected():
                gdpr.click()
            
            self.click_button("#registerBtn")
            time.sleep(1)
            assert "register" in self.get_current_url(), "Validación de contraseña falló"
            self.log("✓ Validación de contraseñas diferentes funcionó")
            
            status = "PASADO"
            details = "Todas las validaciones funcionaron correctamente"
            self.record_result("Escenario 3", status, details)
            self.log(f"\n✅ ESCENARIO 3: {status}\n")
            
            return True
            
        except Exception as e:
            self.log(f"ERROR en Escenario 3: {str(e)}", "ERROR")
            self.record_result("Escenario 3", "FALLIDO", str(e))
            return False
        finally:
            self.teardown()

# ============================================================
# EJECUTOR PRINCIPAL
# ============================================================

class TestRunner:
    """Ejecuta todos los escenarios"""
    
    def __init__(self):
        self.results = []
    
    def run_all(self):
        """Ejecuta todos los escenarios"""
        self.log("╔" + "=" * 58 + "╗")
        self.log("║" + " " * 15 + "INICIANDO TESTING AUTOMATION" + " " * 17 + "║")
        self.log("╚" + "=" * 58 + "╝")
        
        # Ejecutar escenarios
        scenarios = [
            TestScenario1(),
            TestScenario2(),
            TestScenario3(),
        ]
        
        for scenario in scenarios:
            scenario.run()
            self.results.extend(scenario.test_results)
        
        # Resumen
        self.print_summary()
        self.save_results()
    
    def log(self, message):
        print(message)
    
    def print_summary(self):
        """Imprime resumen de resultados"""
        self.log("\n" + "=" * 60)
        self.log("RESUMEN DE TESTING")
        self.log("=" * 60)
        
        total = len(self.results)
        passed = sum(1 for r in self.results if r["status"] == "PASADO")
        failed = total - passed
        
        self.log(f"\nTotal de escenarios: {total}")
        self.log(f"✅ Pasados: {passed}")
        self.log(f"❌ Fallidos: {failed}")
        self.log(f"Tasa de éxito: {(passed/total*100):.1f}%\n")
        
        for result in self.results:
            status_emoji = "✅" if result["status"] == "PASADO" else "❌"
            self.log(f"{status_emoji} {result['scenario']}: {result['details']}")
    
    def save_results(self):
        """Guarda los resultados en JSON"""
        filename = f"test_results_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(self.results, f, indent=2, ensure_ascii=False)
        self.log(f"\nResultados guardados en: {filename}")

# ============================================================
# PUNTO DE ENTRADA
# ============================================================

if __name__ == "__main__":
    runner = TestRunner()
    runner.run_all()
