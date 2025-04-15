import numpy as np
import cv2

# Carregar a imagem
image = cv2.imread('C:/20250128_110731.jpg')
if image is None:
    raise ValueError("Erro ao carregar a imagem. Verifique o caminho e tente novamente.")

print("Imagem carregada com sucesso! Dimensões:", image.shape)

# Copiar a imagem original para desenhar os pontos
image_with_points = image.copy()

# Pontos do mundo real (3D)
object_points = np.array([
    [1.777816873972325, -11.383767260830469, -2.444243256780114],
    [2.8945681785967223, 0.522714080389085, 0.5499176946251676],
    [2.596532062981489, 0.4665171334355127, 0.5453055218330748],
    [1.1659148582125323, -1.1339534300529694, 1.2807852336263492],
    [0.8910168591407754, -10.000975911425064, 1.2915010996641976],
    [0.7755806556499772, -10.649530747515461, 1.3157713498008796],
    [0.512911112427891, -12.11720248328986, 0.769295523402319],
    [-0.5706674070392856, -12.754920181502039, 0.8456599242782763],
    [0.4663864951716935, -11.765048740899173, -1.5662961734299108],
    [0.48705040465295596, -11.391303369198326, -1.5672552581448622],
    [0.5211594956183737, -10.82024420211215, -1.8472597285600165],
    [1.67855517778878, -11.041321167514354, -2.4310801706667324],
    [-10.613846736184268, -3.394953623381467, 3.1697043512032357],
    [-12.754222171497936, 8.950070333874747, 4.02625085245598],
    [0.4861633483607633, -1.6331384424901625, 1.3159872690023235],
    [0.7376118470522629, -1.5980901296956254, 0.3002991817268862],
    [1.1112168273927525, 12.630109158601037, 1.787037027347593],
    [1.1681030365214833, 7.248608613386141, 0.68918623451001],
    [3.099446145070209, -0.40627505676919146, -2.540855035616674],
    [2.009084415318402, -5.635707789659238, -2.425720917407629],
    [1.4435850214815755, -5.586469203350866, -2.4181853078931126],
    [2.0525994608831004, -4.539973129349227, -2.4400229764887933],
    [1.5028438631520067, -4.5169402213882845, -2.417906861155169],
    [-5.259262150906426, 11.731223832125398, 5.592166789223127],
    [-5.129170999034528, 11.541110502694835, 2.798743760608555]
], dtype=np.float32)

# Pontos da imagem (2D)
image_points = np.array([
    [438, 1777], [2965, 1068], [2914, 1071], [2512, 942],
    [839, 804], [673, 791], [238, 902], [150, 927],
    [325, 1496], [440, 1494], [601, 1557], [550, 1759],
    [1451, 818], [2365, 857], [2361, 940], [2393, 1110],
    [3816, 985], [3417, 1099], [2875, 1660], [1866, 1665],
    [1816, 1644], [2078, 1654], [2024, 1631], [3061, 650],
    [3056, 923]
], dtype=np.float32)

# Estimativa inicial da matriz da câmera
camera_matrix = np.array([
    [image.shape[1] // 2, 0, image.shape[1] // 2],  # f_x, c_x
    [0, image.shape[0] // 2, image.shape[0] // 2],  # f_y, c_y
    [0, 0, 1]
], dtype=np.float32)

# Inicializar os coeficientes de distorção
dist_coeffs = np.zeros(5)

# Resolver a calibração inicial
_, rvec, tvec = cv2.solvePnP(object_points, image_points, camera_matrix, dist_coeffs)

# Refinar calibração com calibrateCamera()
object_points_list = [object_points]
image_points_list = [image_points]
image_size = (image.shape[1], image.shape[0])

ret, camera_matrix, dist_coeffs, rvecs, tvecs = cv2.calibrateCamera(
    object_points_list, image_points_list, image_size, camera_matrix, dist_coeffs, flags=cv2.CALIB_USE_INTRINSIC_GUESS
)

if not ret:
    raise ValueError("Erro na calibração da câmera!")

print("Matriz de câmera ajustada:\n", camera_matrix)
print("\nCoeficientes de distorção ajustados:\n", dist_coeffs)

# Projetar os pontos 3D na imagem para comparação
projected_points, _ = cv2.projectPoints(object_points, rvecs[0], tvecs[0], camera_matrix, dist_coeffs)

# Desenhar pontos reais da imagem (Vermelho)
for point in image_points:
    x, y = int(point[0]), int(point[1])
    cv2.circle(image_with_points, (x, y), 8, (0, 0, 255), -1)  # Vermelho

# Desenhar pontos projetados na imagem (Azul)
for point in projected_points.reshape(-1, 2):
    x, y = int(point[0]), int(point[1])
    cv2.circle(image_with_points, (x, y), 5, (255, 0, 0), -1)  # Azul

# Calcular erro médio de reprojeção (RMS)
errors = np.linalg.norm(image_points - projected_points.reshape(-1, 2), axis=1)
mean_error = np.mean(errors)
print("\nErro médio de reprojeção (RMS):", mean_error)

# Corrigir distorção na imagem
undistorted_image = cv2.undistort(image, camera_matrix, dist_coeffs)

if undistorted_image is None or undistorted_image.shape[0] == 0:
    raise ValueError("Erro ao corrigir a distorção!")

print("Imagem corrigida gerada com sucesso!")

# Exibir imagens lado a lado
cv2.namedWindow("Imagem Original com Pontos", cv2.WINDOW_NORMAL)
cv2.imshow("Imagem Original com Pontos", image_with_points)

cv2.namedWindow("Imagem Corrigida", cv2.WINDOW_NORMAL)
cv2.imshow("Imagem Corrigida", undistorted_image)

cv2.waitKey(0)
cv2.destroyAllWindows()


def calcular_altura_iterativa(camera_matrix, dist_coeffs, rvec, tvec, base_mundo, base_imagem, topo_imagem, max_iter=100000, tol=mean_error):
    # Fixar X, Y no mundo real para o topo, igual ao da base
    x_topo_mundo = base_mundo[0]
    y_topo_mundo = base_mundo[1]

    # Inicializar altura do topo (inicia com a altura da base + 1, por exemplo)
    z_topo_mundo = base_mundo[2] + 0.1

    # Iterar até convergir
    for i in range(max_iter):
        # Criar a posição do topo no mundo real com a altura ajustada
        topo_mundo = np.array([x_topo_mundo, y_topo_mundo, z_topo_mundo], dtype=np.float32)

        # Projetar o ponto 3D do topo para 2D usando a calibração
        projected_point, _ = cv2.projectPoints(topo_mundo, rvec, tvec, camera_matrix, dist_coeffs)

        # Calcular a diferença entre o topo projetado e o topo na imagem
        error = np.linalg.norm(projected_point[0][0] - topo_imagem)

        # Se a diferença for menor que a tolerância, consideramos que convergiu
        if error < tol:
            print(f"Convergiu após {i+1} iterações!")
            break

        # Ajuste da altura Z com base no erro total (em X e Y)
        dy = topo_imagem[1] - projected_point[0][0][1]

        # Ajuste proporcional à diferença nos dois eixos
        z_topo_mundo -= 0.001*dy/image.shape[1]  # Ajuste baseado na distância no plano da imagem

        z_altura_mundo = z_topo_mundo - base_mundo[2];

    return z_altura_mundo, topo_mundo

# Exemplo de entrada
base_mundo = np.array([1.8676420074492026, -11.23961845569839, -2.4003256998994225], dtype=np.float32)  # Coordenada 3D da base no mundo
base_imagem = np.array([459, 1753], dtype=np.float32)  # Coordenada 2D da base na imagem
topo_imagem = np.array([457, 1525], dtype=np.float32)   # Coordenada 2D do topo na imagem

# Calcular altura real do objeto de forma iterativa
altura, topo_mundo = calcular_altura_iterativa(camera_matrix, dist_coeffs, rvecs[0], tvecs[0], base_mundo, base_imagem, topo_imagem)

print("Altura do objeto no mundo real:", altura)
print("Posição corrigida do topo no mundo real:", topo_mundo)
print("Posição corrigida do base no mundo real:", base_mundo)