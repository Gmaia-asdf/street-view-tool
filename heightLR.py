import numpy as np
from scipy.stats import norm
import matplotlib.pyplot as plt

# PARÂMETROS DE ENTRADA EM CENTÍMETROS
s_exp = 6    # Incerteza padrão experimental
em =  -1.3    # Erro sistemático

s_med = 2   # Incerteza padrão do instrumento
lm = 0        # Limite máximo do instrumento (usar 0 se for distribuição normal)

a_quest = 175.3  # Altura do questionado
na = 1           # Número de amostras independentes

a_susp = 180     # Altura do suspeito
s_susp = 0    # Incerteza padrão da altura do suspeito
ls = 2.5          # Limite de erro da altura do suspeito

# Dados da população brasileira (IBGE)
m_pop = 173
s_pop = 8

# Intervalo de alturas (domínio da PDF)
incr = 0.1
h = np.arange(120, 230 + incr, incr)

# Distribuição normal assumindo que o suspeito é a fonte do vestígio
desv_a = np.sqrt((1 + (1 / na)) * s_exp**2 + s_med**2+s_susp**2)
PEHa = norm.pdf(h, em + a_susp, desv_a)

# Convolução com uniforme para o limite de erro do suspeito
if ls > 0:
    Us = np.ones(1 + round(2 * ls / incr))
    PEHa = np.convolve(PEHa, Us, mode="same")

# Convolução com uniforme para o limite de erro da medida, se houver
if lm > 0:
    Um = np.ones(1 + round(2 * lm / incr))
    PEHa = np.convolve(PEHa, Um, mode="same")

# Normalização da curva
PEHa = PEHa / np.trapz(PEHa, h)

# Distribuição normal assumindo que outra pessoa seja a fonte
desv_b = np.sqrt(s_pop**2 + (1 + (1 / na)) * s_exp**2 + s_med**2)
PEHb = norm.pdf(h, em + m_pop, desv_b)

# Convolução com uniforme para limite de erro da medida
if lm > 0:
    PEHb = np.convolve(PEHb, Um, mode="same")

# Normalização da curva
PEHb = PEHb / np.trapz(PEHb, h)

# Ponto de interesse: altura estimada do questionado
idx = np.where(np.isclose(h, a_quest, atol=incr/2))[0][0]
p_E_Ha = PEHa[idx]
p_E_Hb = PEHb[idx]
LLR = np.log10(p_E_Ha / p_E_Hb)

print(f"p(E|H_a) = {p_E_Ha}")
print(f"p(E|H_b) = {p_E_Hb}")
print(f"LLR = {LLR}")

# Gráfico
# fig = plt.figure(figsize=(10, 6), dpi=150)  # Aumenta a resolução do gráfico com dpi=150
plt.plot(h, PEHa, linewidth=2, color='blue', label="p(E|Ha): suspeito é a fonte")
plt.plot(h, PEHb, linewidth=2, color='red', label="p(E|Hb): outra pessoa é a fonte")

plt.scatter(h[idx], PEHa[idx], color='black', marker='x')
plt.scatter(h[idx], PEHb[idx], color='black', marker='x')

plt.bar(h[idx], PEHa[idx], width=0.2, color='blue', alpha=0.3)
plt.bar(h[idx], PEHb[idx], width=0.2, color='red', alpha=0.3)

# Adiciona os valores das curvas no gráfico, ambos acima dos pontos
plt.annotate(f"{p_E_Ha:.3e}", (h[idx], PEHa[idx]), textcoords="offset points", xytext=(0,18), ha='center', color='blue', fontsize=12, fontweight='bold', bbox=dict(facecolor='white', alpha=0.8, edgecolor='none'))
plt.annotate(f"{p_E_Hb:.3e}", (h[idx], PEHb[idx]), textcoords="offset points", xytext=(0,18), ha='center', color='red', fontsize=12, fontweight='bold', bbox=dict(facecolor='white', alpha=0.8, edgecolor='none'))

plt.xlabel("Altura (cm)")
plt.ylabel("Verossimilhança")
plt.legend()

# Exibe o LLR mais à direita e acima, dentro do grid
ax = plt.gca()
plt.text(0.98, 0.13, f"LLR = {LLR:.2f}", ha='right', va='bottom', transform=ax.transAxes,
         fontsize=14, bbox=dict(facecolor='white', alpha=0.7, edgecolor='gray'))

plt.grid(False)


mng = plt.get_current_fig_manager()
try:
    mng.window.setGeometry(100, 100, 1000, 600)  # (x, y, largura, altura) em pixels
except AttributeError:
    pass  # Se não funcionar no seu backend, apenas ignora
plt.show()

