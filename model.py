import tensorflow as tf
import json
from PIL import Image
# Opening JSON file
f = open('skin_cancer_best_model_arch.json')
data = json.load(f)
  
loaded_model = tf.keras.models.model_from_json(
    data, custom_objects=None
)
loaded_model.load_weights('skin_cancer_best_model.h5')

def predict(filename):
    name_list = ["akiec", "bcc", "bkl", "df", "mel", "nv", "vasc"]
    im = Image.open(filename)
    im = im.resize((224,224))
    x = tf.keras.utils.img_to_array(im)
    x = x.reshape((1,224,224,3))
    res = loaded_model.predict(x).tolist()[0]
    return sorted(zip(res, name_list), reverse=True)
