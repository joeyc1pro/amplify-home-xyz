import os
import urllib.request

# List of (URL, local_path) pairs
files_to_download = [
    # Level images from 2 to 40
    *[(f"https://csgo.mtsl.dk/images/level%20{n}.png", f"images/level {n}.png") for n in range(2, 41)],
]

def download_file(url, path):
    dir_name = os.path.dirname(path)
    if dir_name:
        os.makedirs(dir_name, exist_ok=True)
    try:
        print(f"Downloading {url} -> {path}")
        urllib.request.urlretrieve(url, path)
    except Exception as e:
        print(f"Failed to download {url}: {e}")

def main():
    for url, path in files_to_download:
        download_file(url, path)

if __name__ == "__main__":
    main()