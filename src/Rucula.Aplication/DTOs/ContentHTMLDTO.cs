﻿namespace Rucula.Aplication;
using System.ComponentModel.DataAnnotations;
public class ContentHTMLDTO
{
        [Required]
        public string Guuid { get;  set; }
        public string Content { get;  set; }
        public DateTime DateCreation { get;  set; }
        public DateTime DateLastUpdate { get;  set; }
        public string ContentLanguageRucula { get;  set; }
}