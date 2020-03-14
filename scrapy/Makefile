SHELL := /bin/bash

# set variables
export NAME = vbm

create-install:
	python3 -m venv venv
	source venv/bin/activate \
		&& pip3 install -r requirements.txt \
		&& ipython kernel install --user --name=$$NAME

install:
	source venv/bin/activate && pip3 install -r requirements.txt

ipython:
	source venv/bin/activate && ipython --pdb

jupyter:
	source venv/bin/activate && jupyter notebook

scrapy-shell:
	source venv/bin/activate && scrapy shell

crawl:
	source venv/bin/activate && scrapy runspider Michigan.py --logfile Michigan.log.txt -o Michigan.jl
